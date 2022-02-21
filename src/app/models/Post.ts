import {Comment} from "./Comment";

export interface Post {
  id?: number;
  title: string;
  caption: string;
  image?: File;
  video?:File;
  likes?: number;
  userLiked?: string[];
  comments?: Comment[];
  username?: string;
}
