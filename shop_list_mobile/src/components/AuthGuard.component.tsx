import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    const navigation = useNavigation();

    const navigateToLogin = () => {
        navigation.navigate('Login');
    };

  if (!isAuthenticated) {
    return (
      <View>
        <Text>You must be logged in to view this page.</Text>
        <Button title="Login" onPress={navigateToLogin} />
      </View>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
