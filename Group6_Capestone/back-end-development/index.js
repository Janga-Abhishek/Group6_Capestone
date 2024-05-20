// Apollo Server: server.js
const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://jangaabhishek:abhishekjanga@cluster0.iivycnm.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Mongodb connection successful"))
  .catch((err) => console.error("Mongodb connection error:", err));

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

// example user schema
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Query {
    user: [User]
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): User
  }
`;

const resolvers = {};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
