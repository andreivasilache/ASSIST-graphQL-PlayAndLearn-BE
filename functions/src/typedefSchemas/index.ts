import { gql } from "apollo-server-express";

const typeDefs = gql`
  # A Twitter User
  type User {
    id: ID!
    name: String
    profileImgUrl: String
  }

  # A Tweet Object
  type Post {
    id: ID!
    description: String!
    date: String!
    reactions: [ID]
    user: User!
  }

  type Query {
    posts: [Post]
    user(id: String!): User
    post(id: String!): Post
  }

  type Response {
    message: String
  }

  type Mutation{
    toggleLike(userId: String!, postId: String!): Response 
    createPost(description: String!, user: ID!): Post 
  }
`;

export default typeDefs;
