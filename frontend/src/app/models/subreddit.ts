export interface Subreddit {
  id: string;
  pic: string;
  name: string;
  desc: string;
  answers: number;
  answer: string;
  keywords: string[];
  added: Date;
  active: boolean;
}
