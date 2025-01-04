import axiosConfig from '../../configs/axios/axiosConfig';

export const imageService = {
    converetImageToBase64: async (image: File): Promise<string> => {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onload = () => {
                resolve(reader.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(image);
        });
    },

    uploadImage: async (productId: string, image: string): Promise<void> => {
        try {
            await axiosConfig.put(`products/image/${productId}`, {image});
        } catch (error) {
            console.error('Upload image failed', error);
            throw error;
        }
    },

    deleteImage: async (productId: string): Promise<void> => {
        try {
            await axiosConfig.delete(`products/image/delete/${productId}`);
        } catch (error) {
            console.error('Delete image failed', error);
            throw error;
        }
    },

    getImage: async (productId: string): Promise<string> => {
        try {
            const response = await axiosConfig.get<{image: string}>(`products/image/${productId}`);
            return response.data.image;
        } catch (error) {
            console.error('Get image failed', error);
            throw error;
        }
    },
};
