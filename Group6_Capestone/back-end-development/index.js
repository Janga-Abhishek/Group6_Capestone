const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://jangaabhishek:abhishekjanga@cluster0.iivycnm.mongodb.net/Group6_Capestone?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define User schema
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  userType: String,
});

const User = mongoose.model("User", UserSchema);

// Define GraphQL schema
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    userType: String!
  }

  type Query {
    user(id: ID!): User
    users: [User]
  }

  type Mutation {
    register(
      username: String!
      email: String!
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
  },
  Mutation: {
    register: async (_, { username, email, password, userType }) => {
      try {
        const user = new User({ username, email, password, userType });
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
