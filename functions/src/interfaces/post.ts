import { User } from "./user";

export interface Post {
  id?: string;
  description: string;
  date: string;
  reactions: Array<string>;
  user: User;
}
