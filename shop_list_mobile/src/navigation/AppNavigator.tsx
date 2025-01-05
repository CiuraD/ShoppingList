import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from '../contexts/AuthContext';
import AuthGuard from '../components/AuthGuard.component';
import { RootStackParamList } from './types';
import HeaderMenu from '../components/HeaderMenu';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProductListScreen from '../screens/ProductListScreen';
import GroupListScreen from '../screens/GroupListScreen';

const Stack = createStackNavigator<RootStackParamList>();

const HomeWithAuthGuard: React.FC = () => {
    return (
        <AuthGuard>
            <HomeScreen />
        </AuthGuard>
    );
};

const ProductListsWithAuthGuard: React.FC = () => {
    return (
        <AuthGuard>
            <ProductListScreen />
        </AuthGuard>
    );
};

const GroupListWithGuard: React.FC = () => {
    return (
        <AuthGuard>
            <GroupListScreen />
        </AuthGuard>
    );
};

const AppNavigator: React.FC = () => {
    console.log('Rendering AppNavigator');
    const renderHeaderRight = (navigation: any) => <HeaderMenu navigation={navigation} />;

    return (
        <NavigationContainer>
            <AuthProvider>
                <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={({ navigation }) => ({
                        gestureEnabled: false,
                        headerLeft: () => null,
                        headerRight: () => renderHeaderRight(navigation),
                    })}
                >
                    <Stack.Screen name="Home" component={HomeWithAuthGuard} />
                    <Stack.Screen name="ProductLists" component={ProductListsWithAuthGuard} />
                    <Stack.Screen name="GroupList" component={GroupListWithGuard} />
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
};

export default AppNavigator;
