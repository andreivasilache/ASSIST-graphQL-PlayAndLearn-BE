import { Reaction } from "./reaction";

export interface Post {
  id: string;
  description: string;
  date: string;
  reactions: [Reaction];
  userId: string;
}
