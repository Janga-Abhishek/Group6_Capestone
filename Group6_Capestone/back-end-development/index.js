const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://revathysasi01:123Mongodb@cluster0.fxezvmm.mongodb.net/Group6_Capestone?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define User schema
const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  phonenumber: String,
  address: String,
  username: String,
  password: String,
  insuranceNumber: String,
  userType: String,
  registeredDate: { type: Date, default: Date.now }
});

const User = mongoose.model("User", UserSchema);

// Define GraphQL schema
const typeDefs = gql`
scalar Date
  type User {
    id: ID!
    firstname: String!
    lastname: String!
    email: String!
    phonenumber: String!
    address: String!
    insuranceNumber: String!
    username: String!
    password: String!
    userType: String!
    registeredDate:Date!
  }

  type Query {
    user(id: ID!): User
    users: [User]
    checkUsername(username:String!):Boolean
  }

  type Mutation {
    RegisterUser(
      firstname: String!
      lastname: String!
      email: String!
      phonenumber: String!
      address: String!
      insuranceNumber: String!
      username: String!
      password: String!
      userType: String!
    ): User
    loginUser(username: String!, password: String!): User
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    user: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (error) {
        throw new Error("User not found");
      }
    },
    users: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error("Error fetching users");
      }
    },
    checkUsername: async (_, { username }) => { 
      try{
      const user = await User.findOne({ username });
      return !!user; 
    }catch (error) {
      throw new Error("Error fetching users");
    }
    },
  },

  Mutation: {
    RegisterUser: async (
      _,
      {
        firstname,
        lastname,
        email,
        phonenumber,
        address,
        insuranceNumber,
        username,
        password,
        userType,
      }
    ) => {
      try {
        const user = new User({
          firstname,
          lastname,
          email,
          phonenumber,
          address,
          insuranceNumber,
          username,
          password,
          userType,
        });
        await user.save();
        return user;
      } catch (error) {
        throw new Error("Error registering user");
      }
    },
    loginUser: async (_, { username, password }) => {
      try {
        const user = await User.findOne({ username, password });
        if (!user) {
          throw new Error("Invalid credentials");
        }
        return user;
      } catch (error) {
        console.error("Error in loginUser resolver:", error);
        throw new Error("Invalid credentials");
      }
    },
  },
};

// Create Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
