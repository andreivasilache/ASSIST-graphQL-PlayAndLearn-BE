import * as admin from "firebase-admin";
import { Post } from "../interfaces/post";

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
