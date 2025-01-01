import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import {jwtDecode} from 'jwt-decode';
import { storageService } from '../services/storage/storage.service';
import { STORAGE_KEY_JWT_TOKEN } from '../constants';
import { authService } from '../services/auth/auth.service';
import { RootStackParamList } from '../navigation/types';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  navigateToLogin: () => void;
}

interface DecodedToken {
  exp: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await storageService.getItem(STORAGE_KEY_JWT_TOKEN);
      console.log('AuthContext: Retrieved token =', token);
      if (token) {
        const decodedToken = jwtDecode<DecodedToken>(token);
        console.log('AuthContext: Decoded token =', decodedToken);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          await storageService.removeItem(STORAGE_KEY_JWT_TOKEN);
          navigation.navigate('Login');
        }
      } else {
        setIsAuthenticated(false);
        navigation.navigate('Login');
      }
    };

    checkAuth();
  }, [navigation]);

  const login = async (username: string, password: string) => {
    try {
      await authService.login({ username, password });
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, navigateToLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};