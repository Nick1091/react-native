declare global {
  namespace ReactNavigation {
    interface RootParamList {
      index: undefined;
      'profile/index': undefined;
      'articles/[id]': { id: string };
      'articles/index': undefined;
      '+not-found': undefined;
    }
  }
}
