import * as functions from "firebase-functions";
import { ApolloServer } from "apollo-server-express";

import typeDefs from "./typedefSchemas/index";
import resolvers from "./resolvers/resolvers";
import express from "express";
import http from 'http';

const app = express();
const cors = require("cors");
app.options("*", cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  subscriptions: {
    onConnect: (connectionParams, webSocket) => {
      // if (connectionParams.authToken) {
      //   // return validateToken(connectionParams.authToken)
      //   //   .then(findUser(connectionParams.authToken))
      //   //   .then(user => {
      //   //     return {
      //   //       currentUser: user,
      //   //     };
      //   //   });
      // }

      throw new Error('Missing auth token!');
    },
  },
});

server.applyMiddleware({ app, path: "/", cors: true });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

exports.graphql = functions.https.onRequest(app);
