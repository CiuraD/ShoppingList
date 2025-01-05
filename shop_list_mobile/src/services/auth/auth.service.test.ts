import { authService } from './auth.service';
import axiosConfig from '../../configs/axios/axiosConfig';
import { storageService } from '../storage/storage.service';
import { STORAGE_KEY_JWT_TOKEN, STORAGE_KEY_USERNAME } from '../../constants';
import { RegisterRequest } from '../user/interfaces/registerRequest.interface';

jest.mock('jwt-decode', () => jest.fn());

jest.mock('../../configs/axios/axiosConfig');
jest.mock('../storage/storage.service');

describe('authService', () => {
    const mockRegisterRequest: RegisterRequest = { username: 'testUser', password: 'testPassword', email: 'test@example.com' };

    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    it('should register a user', async () => {
        await authService.register(mockRegisterRequest);

        expect(axiosConfig.post).toHaveBeenCalledWith('users/register', mockRegisterRequest);
    });

    it('should handle register error', async () => {
        const mockError = new Error('Register failed');
        (axiosConfig.post as jest.Mock).mockRejectedValue(mockError);

        await expect(authService.register(mockRegisterRequest)).rejects.toThrow('Register failed');
        expect(console.error).toHaveBeenCalledWith('Register failed', mockError);
    });

    it('should logout and remove token and username', async () => {
        await authService.logout();

        expect(storageService.removeItem).toHaveBeenCalledWith(STORAGE_KEY_JWT_TOKEN);
        expect(storageService.removeItem).toHaveBeenCalledWith(STORAGE_KEY_USERNAME);
    });

    it('should handle logout error', async () => {
        const mockError = new Error('Logout failed');
        (storageService.removeItem as jest.Mock).mockRejectedValue(mockError);

        await expect(authService.logout()).rejects.toThrow('Logout failed');
        expect(console.error).toHaveBeenCalledWith('Logout failed', mockError);
    });
});