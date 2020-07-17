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

async function getPost(postId: any): Promise<Post>{
  try{
    const post = (await (await admin.firestore().collection('posts').doc(postId).get()).data()) as Post; 
    return post
  }catch(err){
    return Promise.reject(null)
  }
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
      const user = await getUserById(args.id)
      return user
    }
  },
  Mutation: {
     toggleLike : async (_:null,args:{userId:string, postId:string})=> {
      console.log(args.userId, args.postId)
      const currentPost = await getPost(args.postId)
      if(currentPost){
        const postLikesIds = currentPost.reactions
        const indexOfPost = postLikesIds.indexOf(args.userId) 

        indexOfPost !== -1 ? postLikesIds.splice(indexOfPost, 1) : postLikesIds.push(args.userId)
        await admin.firestore().doc(`posts/${args.postId}`).update({reactions: postLikesIds})
        
        return {message: "Success!"} 
      }else{
        return {message: "Wrong args passed :("} 
      }
    },
    createPost : async (_:null, args:{description:string, user:any})=> {
      const tbr: Post = {
        date: +new Date() + "",
        description: args.description,
        user: args.user,
        reactions: [],
      }

      await admin.firestore().collection("posts").add(tbr).then(data => tbr.id = data.id)
      return tbr;
    },
  }
};

export default resolvers;
