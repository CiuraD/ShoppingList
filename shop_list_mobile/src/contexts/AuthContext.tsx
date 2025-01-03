import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { storageService } from '../services/storage/storage.service';
import { STORAGE_KEY_JWT_TOKEN } from '../constants';
import { useNavigateTo } from '../navigation/navigationUtility';
import { authService } from '../services/auth/auth.service';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  navigateToLogin: () => void;
}

interface DecodedToken {
  exp: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigateTo = useNavigateTo();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await storageService.getItem(STORAGE_KEY_JWT_TOKEN);
      console.log('Token:', token);
      if (token) {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          await storageService.removeItem(STORAGE_KEY_JWT_TOKEN);
          navigateTo('Login');
        }
      } else {
        setIsAuthenticated(false);
        navigateTo('Login');
      }
    };

    checkAuth();
  }, [navigateTo]);

  const login = async (username: string, password: string) => {
    try {
      await authService.login({ username, password });
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      await authService.register({ username, email, password });
    } catch (error) {
      console.error('Register failed', error);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      navigateTo('Login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const navigateToLogin = () => {
    navigateTo('Login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout, navigateToLogin }}>
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
