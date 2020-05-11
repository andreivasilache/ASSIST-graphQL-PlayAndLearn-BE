import * as functions from "firebase-functions";
import { ApolloServer, ApolloError, ValidationError, gql } from "apollo-server";
import typeDefs from "./typedefSchemas/index";
import resolvers from "./resolvers/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
