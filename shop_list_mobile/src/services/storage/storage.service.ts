import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageService = {

    async setItem(key: string, value: string) {
        try {
        await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.error(error);
        }
    },

    async getItem(key: string) {
        try {
            return await AsyncStorage.getItem(key);
        } catch (error) {
            console.error(error);
        }
    },

    async removeItem(key: string) {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error(error);
        }
    },
};
