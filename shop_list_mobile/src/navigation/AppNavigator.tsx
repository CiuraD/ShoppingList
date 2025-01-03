import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from '../contexts/AuthContext';
import AuthGuard from '../components/AuthGuard.component';
import { RootStackParamList } from './types';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';

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
                <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        gestureEnabled: false,
                        headerLeft: () => null,
                    }}
                >
                    <Stack.Screen name="Home" component={HomeWithAuthGuard} />
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Register"
                        component={RegisterScreen}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </AuthProvider>
        </NavigationContainer>
    );
};;

export default AppNavigator;
