import * as admin from "firebase-admin";
import { Post } from "../interfaces/post";
import { User } from "../interfaces/user";

const credentials = require("./../../assist-gql-presentation-firebase-adminsdk-b6ont-708749a784.json");
admin.initializeApp({
  credential: admin.credential.cert(credentials),
  databaseURL: "https://assist-gql-presentation.firebaseio.com",
});
const resolvers = {
  Query: {
    async posts() {
      const posts = await admin.firestore().collection("posts").get();
      console.log('posts', posts.docs.map((post) => post.data()))

      const rawPosts = posts.docs.map((post) => post.data()) as Post[]

      rawPosts.forEach(async post => {
        post.user = (await admin.firestore().doc(`users/${post.user}`) as any) as User;
      })

      console.log(rawPosts)

      return rawPosts;
    },
    async user(_: null, args: { id: string }) {
      // const user = await admin.firestore().collection("users").get();
      
    }
  },
};

export default resolvers;
