import { LoginRequest } from '../user/interfaces/loginRequest.interface';
import axiosConfig from '../../configs/axios/axiosConfig';
import { storageService } from '../storage/storage.service';
import { STORAGE_KEY_JWT_TOKEN, STORAGE_KEY_USERNAME } from '../../constants';
import { LoginResponse } from '../user/interfaces/loginResponse.interface';
import {RegisterRequest} from '../user/interfaces/registerRequest.interface';
import {jwtDecode} from 'jwt-decode';

export const authService = {
    login: async (data: LoginRequest): Promise<void> => {
        try {
            const response = await axiosConfig.post<LoginResponse>('users/login', data);
            if (response.data.token) {
                const usernameFromToken = jwtDecode<{ username: string }>(response.data.token).sub;
                await storageService.setItem(STORAGE_KEY_JWT_TOKEN, response.data.token);
                await storageService.setItem(STORAGE_KEY_USERNAME, usernameFromToken);
            }
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        }
    },

    register: async (data: RegisterRequest): Promise<void> => {
        try {
            await axiosConfig.post('users/register', data);
        } catch (error) {
            console.error('Register failed', error);
            throw error;
        }
    },

    logout: async (): Promise<void> => {
        try {
            await storageService.removeItem(STORAGE_KEY_JWT_TOKEN);
            await storageService.removeItem(STORAGE_KEY_USERNAME);
        } catch (error) {
            console.error('Logout failed', error);
            throw error;
        }
    },
};
