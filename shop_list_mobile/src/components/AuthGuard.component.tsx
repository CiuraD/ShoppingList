import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        console.log('AuthGuard: isAuthenticated =', isAuthenticated);
        if (!isAuthenticated) {
            navigation.navigate('Login');
        }
    }, [isAuthenticated, navigation]);

    if (!isAuthenticated) {
        return (
            <View>
                <Text>You must be logged in to view this page.</Text>
            </View>
        );
    }

    return <>{children}</>;
};

export default AuthGuard;