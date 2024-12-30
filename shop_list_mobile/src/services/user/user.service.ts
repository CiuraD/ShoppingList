import axiosConfig from '../../configs/axios/axiosConfig';

export default class UserService {
    static async getUserId(username: string): Promise<string> {
        const response = await axiosConfig.get<string>(`/api/users/getUserId/${username}`);
        return response.data;
    }
}
