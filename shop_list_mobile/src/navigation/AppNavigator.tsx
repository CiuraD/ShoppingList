import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import { AuthProvider } from '../contexts/AuthContext';
import AuthGuard from '../components/AuthGuard.component';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

const HomeWithAuthGuard: React.FC = () => {
    console.log('Rendering HomeWithAuthGuard');
    return (
        <AuthGuard>
            <HomeScreen />
        </AuthGuard>
    );
};

const AppNavigator: React.FC = () => {
    console.log('Rendering AppNavigator');
    return (
        <NavigationContainer>
            <AuthProvider>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeWithAuthGuard} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                </Stack.Navigator>
            </AuthProvider>
        </NavigationContainer>
    );
};

export default AppNavigator;
