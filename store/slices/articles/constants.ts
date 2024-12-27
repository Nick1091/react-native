import { Article } from '@/api/articles/types';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const ARTICLES_SLICE_NAME = 'articles';

export const articlesAdapter = createEntityAdapter<Article, string>({
  selectId: (article) => article.uid,
});

export const initialState = {
  articles: articlesAdapter.getInitialState(),
};
