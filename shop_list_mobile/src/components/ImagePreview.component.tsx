import React, { useEffect, useState } from 'react';
import { View, Text, Image, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { imageService } from '../services/img/image.service';
import {launchImageLibrary, ImageLibraryOptions} from 'react-native-image-picker';

interface ImagePreviewProps {
    imageBase64?: any;
    productID: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageBase64, productID }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [base64String, setBase64String] = useState('');

    useEffect(() => {
        if (imageBase64) {
            const parsedImageBase64 = JSON.parse(imageBase64);
            const base64String = parsedImageBase64.image;
            setBase64String(base64String);
        }
    }, [imageBase64]);

    const handlePreviewPress = () => {
        console.log('Preview pressed', base64String);
        setModalVisible(true);
    };

    const handleImgDelete = () => {
        imageService.deleteImage(productID);
        setBase64String('');
        setModalVisible(false);
    };

    const handleImagePicker = () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            quality: 0.5,
            includeBase64: true,
            maxHeight: 600,
            maxWidth: 800,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.error('Image picker error', response.errorCode);
            } else {
                console.log('Image picker response', response);
                const base64 = response.assets && response.assets[0].base64;
                const type = response.assets && response.assets[0].type;
                const preperedBase64 = `data:${type};base64,${base64}`;
                if (!base64) {
                    console.error('No base64 string in image picker response');
                    return;
                }
                setBase64String(preperedBase64);
                imageService.uploadImage(productID, preperedBase64);
            }
        });
    };

    return (
        <View>
            {base64String ? (
                <>
                    <TouchableOpacity onPress={() => handlePreviewPress()}>
                        <Image
                            source={{ uri: `${base64String}` }}
                            style={{ width: 100, height: 100 }}
                        />
                    </TouchableOpacity>
                    <Modal
                        visible={modalVisible}
                        transparent={true}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.modalCloseText}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalDeleteButton} onPress={() => handleImgDelete()}>
                                <Text style={styles.modalCloseText}>Delete</Text>
                            </TouchableOpacity>
                            <Image
                                source={{ uri: `${base64String}` }}
                                style={styles.fullScreenImage}
                            />
                        </View>
                    </Modal>
                </>
            ) : (
                <TouchableOpacity onPress={handleImagePicker}>
                    <Text>No image available. Tap to select an image.</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalCloseButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 1,
    },
    modalDeleteButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
    },
    modalCloseText: {
        color: 'white',
        fontSize: 18,
    },
    fullScreenImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});

export default ImagePreview;