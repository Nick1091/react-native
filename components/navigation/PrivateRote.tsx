import React, { ReactNode, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/providers/AuthProvider';

const PrivateRoute = ({ children }: { children: ReactNode } ) => {
  const { isAuthenticated } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate('index' as never);
    }
  }, [isAuthenticated, navigation]);
  
  if (!isAuthenticated) {
    return (
      <View>
        <Text>Redirecting...</Text>
      </View>
    );
  }

  return children;
};

export default PrivateRoute;
