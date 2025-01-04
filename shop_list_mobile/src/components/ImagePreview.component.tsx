import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { imageService } from '../services/img/image.service';

interface ImagePreviewProps {
    productId: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ productId }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const image = await imageService.getImage(productId);
                setSelectedImage(image);
            } catch (fetchError) {
                setError('Failed to fetch image');
            }
        };

        fetchImage();
    }, [productId]);

    const handleImageChange = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            const response = await fetch(uri);
            const blob = await response.blob();
            const file = new File([blob], 'selectedImage.jpg', { type: blob.type, lastModified: Date.now() });
            const base64 = await imageService.converetImageToBase64(file);
            setSelectedImage(base64);
        }
    };

    const handleUpload = async () => {
        if (selectedImage) {
            setUploading(true);
            setError(null);
            try {
                await imageService.uploadImage(productId, selectedImage);
                setMessage('Image uploaded successfully');
            } catch (uploadError) {
                setError('Upload failed');
            } finally {
                setUploading(false);
            }
        } else {
            Alert.alert('No image selected', 'Please select an image to upload.');
        }
    };

    return (
        <View>
            <Button title="Pick an image from camera roll" onPress={handleImageChange} />
            {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
            {uploading && <ActivityIndicator size="large" color="#0000ff" />}
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
            {message && <Text>{message}</Text>}
            <Button title="Upload Image" onPress={handleUpload} />
        </View>
    );
};

export default ImagePreview;