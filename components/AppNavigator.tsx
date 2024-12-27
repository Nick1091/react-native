import { createStackNavigator } from '@react-navigation/stack';
import ViewArticle from '@/app/articles/[id]';
import { useGetArticleQuery } from '@/api';
import { RouteProp } from '@react-navigation/native';

export interface ArticleRouteParams {
  id: string;
  title: string;
}

export type RootStackParamList = {
  'articles/[id]': ArticleRouteParams;
};

export interface ArticleRouteParams {
  id: string;
  title: string;
}

const Stack = createStackNavigator<RootStackParamList>();
export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="articles/[id]"
        component={ViewArticle}
        options={({
          route,
        }: {
          route: RouteProp<RootStackParamList, 'articles/[id]'>
        }) => {
          const { id } = route.params;
          const { data: article } = useGetArticleQuery(id);
          return {
            headerShown: true,
            title: article ? article.title : `Article ${id}`,
          };
        }}
      />
    </Stack.Navigator>
  );
}
