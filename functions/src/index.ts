// import * as functions from "firebase-functions";
// import { ApolloServer } from "apollo-server-express/";
const ApolloServer = require('apollo-server-express')

const typeDefs = require("./typedefSchemas/index")
const resolvers =  require("./resolvers/resolvers")
const express =  require("express")
const http =  require("http")


const app = express();
const cors = require("cors");
app.options("*", cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  // subscriptions: {
  //   onConnect: (connectionParams, webSocket) => {
  //     // if (connectionParams.authToken) {
  //     //   // return validateToken(connectionParams.authToken)
  //     //   //   .then(findUser(connectionParams.authToken))
  //     //   //   .then(user => {
  //     //   //     return {
  //     //   //       currentUser: user,
  //     //   //     };
  //     //   //   });
  //     // }

  //     throw new Error('Missing auth token!');
  //   },
  // },
});

server.applyMiddleware({ app, path: "/", cors: true });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

app.get("/", ()=> {
  console.log('here!')
})
app.listen(3000, () => console.log(`Example app listening at http://localhost:${3000}`))

// exports.graphql = functions.https.onRequest(app);
// const PORT = 4000
// httpServer.listen(PORT, () => {
//   console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
//   console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
// })
