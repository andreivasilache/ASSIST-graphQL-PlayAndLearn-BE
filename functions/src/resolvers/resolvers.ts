import * as admin from "firebase-admin";
import { Post } from "../interfaces/post";
import { User } from "../interfaces/user";

const credentials = require("./../../assist-gql-presentation-firebase-adminsdk-b6ont-708749a784.json");
admin.initializeApp({
  credential: admin.credential.cert(credentials),
  databaseURL: "https://assist-gql-presentation.firebaseio.com",
});

async function getUserById(userId: string){
  const userData = (await (await admin.firestore().collection('users').doc(userId).get()).data()) as User; 
  return userData
}

async function getCompletedPosts(rawPosts: Post[]){
  const toBeReturned: Post[] = []

  for (const post of rawPosts) {
    const serverRes = await getUserById(post.user as any)
    const userId: string = post.user as any
    post.user = { ...serverRes, id: userId}

    toBeReturned.push(post)
  }

  return Promise.resolve(toBeReturned)
}

async function getPost(postId: string): Promise<Post>{
  const post = (await (await admin.firestore().collection('posts').doc(postId).get()).data()) as Post; 
  return post
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
      const user = await getUserById(args.id)
      return user
    }
  },
  Mutation: {
    async toggleLike(userId: string, postId: string){
      const currentPost = await getPost(postId)
      const postLikesIds = currentPost.reactions
      const indexOfPost = postLikesIds.indexOf(userId) 
      
      if(indexOfPost !== -1){
        postLikesIds.splice(indexOfPost, 1)
      }else{
        postLikesIds.push(userId)
      }
      await admin.firestore().doc(`posts/${postId}`).update({reactions: postLikesIds})
      return "Success!"
    },
  }
};

export default resolvers;
