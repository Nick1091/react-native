import { baseApi } from '../base';
import { ArticleDto, ArticleUpdateDto } from './articleDto';

import { ARTICLES_PATH } from './constants';
import { Article } from './types';

export const articlesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query<Article[], undefined>({
      query: () => ({
        url: `${ARTICLES_PATH}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ uid }) => ({ type: 'Articles', uid } as const)),
              { type: 'Articles', uid: 'LIST' },
            ]
          : [{ type: 'Articles', uid: 'LIST' }],
    }),
    getArticle: builder.query<Article, string>({
      query: (uid) => ({
        url: `${ARTICLES_PATH}/${uid}`,
        method: 'GET',
      }),
    }),
    delete: builder.mutation<void, string>({
      query: (uid) => ({
        url: `${ARTICLES_PATH}/${uid}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, uid) => [{ type: 'Articles', uid }],
    }),
    update: builder.mutation<Article, ArticleUpdateDto>({
      query: ({ uid, ...article }) => ({
        url: `${ARTICLES_PATH}/${uid}`,
        method: 'PUT',
        data: article,
      }),
      invalidatesTags: (result, error, { uid }) => [{ type: 'Articles', uid }],
    }),
    create: builder.mutation<Article, ArticleDto>({
      query: (article) => ({
        url: `${ARTICLES_PATH}`,
        method: 'POST',
        data: article,
      }),
      invalidatesTags: ['Articles'],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useDeleteMutation,
  useUpdateMutation,
  useGetArticleQuery,
  useCreateMutation,
} = articlesApi;
