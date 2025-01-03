import axios from 'axios';
import {EMULATOR_API_URL, STORAGE_KEY_JWT_TOKEN, API_TIMEOUT} from '../../constants';
import {storageService} from '../../services/storage/storage.service';

const axiosConfig = axios.create({
    baseURL: EMULATOR_API_URL,
    timeout: API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosConfig.interceptors.request.use(
    async (config) => {
        const token = await storageService.getItem(STORAGE_KEY_JWT_TOKEN);
        if (token) {
            if (!config.headers) {
                config.headers = new axios.AxiosHeaders();
            }
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('token:', token);
        console.log('Request config:', config);
        return config;
    }
);

export default axiosConfig;
