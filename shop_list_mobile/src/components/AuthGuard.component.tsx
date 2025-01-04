import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useNavigateTo } from '../navigation/navigationUtility';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    const navigateTo = useNavigateTo();

    useEffect(() => {
        console.log('AuthGuard: isAuthenticated =', isAuthenticated);
        if (!isAuthenticated) {
            navigateTo('Login');
        }
    }, [isAuthenticated, navigateTo]);

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
