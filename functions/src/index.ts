import * as functions from "firebase-functions";
import { ApolloServer } from "apollo-server-express";

import typeDefs from "./typedefSchemas/index";
import resolvers from "./resolvers/resolvers";

const express = require("express");
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app, path: "/", cors: true });
exports.graphql = functions.https.onRequest(app);
