import { Article } from "./types";

export interface ArticleDto {
  title: string;
  content: string;
}

export interface ArticleUpdateDto extends Partial<Article> {
  title: string;
  content: string;
  userUid: string
  uid: string;
}
