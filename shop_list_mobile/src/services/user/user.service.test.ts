import axiosConfig from '../../configs/axios/axiosConfig';
import UserService from './user.service';

jest.mock('../../configs/axios/axiosConfig');

describe('UserService', () => {
    const mockUsername = 'testUser';
    const mockUserId = '12345';

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get user ID', async () => {
        (axiosConfig.get as jest.Mock).mockResolvedValue({ data: mockUserId });
        const result = await UserService.getUserId(mockUsername);
        expect(result).toBe(mockUserId);
        expect(axiosConfig.get).toHaveBeenCalledWith(`users/getUserId/${mockUsername}`);
    });
});
