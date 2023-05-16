export interface Post {
  body: string;
  id: number;
  reactions: number;
  tags: string[];
  title: string;
  userId: number;
}