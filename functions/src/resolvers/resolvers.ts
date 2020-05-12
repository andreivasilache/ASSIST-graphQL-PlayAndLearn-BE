import * as admin from "firebase-admin";
import { Post } from "../interfaces/post";

const credentials = require("./../../assist-gql-presentation-firebase-adminsdk-b6ont-708749a784.json");
admin.initializeApp({
  credential: admin.credential.cert(credentials),
  databaseURL: "https://assist-gql-presentation.firebaseio.com",
});

const resolvers = {
  Query: {
    async posts() {
      const posts = await admin.firestore().collection("posts").get();
      return posts.docs.map((post) => post.data()) as Post[];
    },
    // async user(_: null, args: { id: string }) {

    // }
  },
};

export default resolvers;
