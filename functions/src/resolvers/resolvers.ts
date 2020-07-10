import * as admin from "firebase-admin";
import { Post } from "../interfaces/post";
import { User } from "../interfaces/user";

const credentials = require("./../../assist-gql-presentation-firebase-adminsdk-b6ont-708749a784.json");
admin.initializeApp({
  credential: admin.credential.cert(credentials),
  databaseURL: "https://assist-gql-presentation.firebaseio.com",
});

async function getCompletedPosts(rawPosts: Post[]){
  const toBeReturned: Post[] = []

  for (const post of rawPosts) {
    const serverRes = (await (await admin.firestore().collection('users').doc(post.user as any).get()).data()) as User; 
    const userId: string = post.user as any
    post.user = { ...serverRes, id: userId}

    toBeReturned.push(post)
  }

  return Promise.resolve(toBeReturned)
}
const resolvers = {
  Query: {
    async posts() {
      const posts = await admin.firestore().collection("posts").get();

      const rawPosts: Post[] = posts.docs.map((post) => post.data()) as Post[]
      const completedPosts: Post[] = await getCompletedPosts(rawPosts)

      return completedPosts;
    },
    async user(_: null, args: { id: string }) {
      // const user = await admin.firestore().collection("users").get();
      
    }
  },
};

export default resolvers;
