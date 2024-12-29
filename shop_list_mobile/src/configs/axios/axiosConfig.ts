import axios from 'axios';
import {EMULATOR_API_URL, STORAGE_KEY_JWT_TOKEN, API_TIMEOUT} from '../../constants';

const axiosConfig = axios.create({
    baseURL: EMULATOR_API_URL,
    timeout: API_TIMEOUT,
});

axiosConfig.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(STORAGE_KEY_JWT_TOKEN);
        if (token) {
            if (!config.headers) {
                config.headers = {};
            }
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);

export default axiosConfig;
