import { gql } from "apollo-server";

const typeDefs = gql`
  # A Twitter User
  type User {
    id: ID!,
    name: String!,
    profileImgUrl: String 
  }

  # A Tweet Object
  type Post {
    id: ID!,
    description: String!
    date: String!
    reactions: [ID];
    userId: String!
  }

  type Query {
    posts: [Post]    
    user(id: String!): User
    post(id:String!): Post
  }
`;

export default typeDefs;
