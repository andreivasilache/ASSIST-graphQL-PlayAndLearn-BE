import * as functions from "firebase-functions";
import { ApolloServer } from "apollo-server-express";

import typeDefs from "./typedefSchemas/index";
import resolvers from "./resolvers/resolvers";
import express from "express";

const app = express();
const cors = require("cors");
app.options("*", cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

server.applyMiddleware({ app, path: "/", cors: true });
exports.graphql = functions.https.onRequest(app);
