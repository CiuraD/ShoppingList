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
import ProductListFormScreen from '../screens/ProductListFormScreen';
import GroupFormScreen from '../screens/GroupFormScreen';

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

const ProductListFormWithGuard: React.FC = () => {
    return (
        <AuthGuard>
            <ProductListFormScreen />
        </AuthGuard>
    );
};

const GroupFormWithGuard: React.FC = () => {
    return (
        <AuthGuard>
            <GroupFormScreen route={undefined as any} navigation={undefined as any} />
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
                        headerRightContainerStyle: {
                            marginRight: 10,
                        },
                        headerStyle: {
                            backgroundColor: '#f8f8f8',
                        },
                    })}
                >
                    <Stack.Screen name="Home" component={HomeWithAuthGuard} />
                    <Stack.Screen name="ProductLists" component={ProductListsWithAuthGuard} />
                    <Stack.Screen name="GroupList" component={GroupListWithGuard} />
                    <Stack.Screen name="ProductListForm" component={ProductListFormWithGuard} />
                    <Stack.Screen name="GroupForm" component={GroupFormWithGuard} />

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
