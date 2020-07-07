import { Reaction } from "./reaction";
import { User } from "./user";

export interface Post {
  id: string;
  description: string;
  date: string;
  reactions: [Reaction];
  user: User;
}
