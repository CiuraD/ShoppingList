import { LoginRequest } from '../user/interfaces/loginRequest.interface';
import axiosConfig from '../../configs/axios/axiosConfig';
import { storageService } from '../storage/storage.service';
import { STORAGE_KEY_JWT_TOKEN, STORAGE_KEY_USERNAME } from '../../constants';
import { LoginResponse } from '../user/interfaces/loginResponse.interface';
import {RegisterRequest} from '../user/interfaces/registerRequest.interface';

export const authService = {
    login: async (data: LoginRequest): Promise<void> => {
        try {
            const response = await axiosConfig.post<LoginResponse>('/api/users/login', {data});
            if (response.data.token && response.data.username) {
                await storageService.setItem(STORAGE_KEY_JWT_TOKEN, response.data.token);
                await storageService.setItem(STORAGE_KEY_USERNAME, response.data.username);
            }
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        }
    },

    register: async (data: RegisterRequest): Promise<void> => {
        try {
            await axiosConfig.post('/api/users/register', {data});
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
