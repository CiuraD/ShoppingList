import React, { useState } from 'react';
import { imageService } from '../services/img/image.service';

interface ImagePreviewProps {
    productId: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ productId }) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [_error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            const base64 = await imageService.converetImageToBase64(file);
            setPreviewUrl(base64);
        }
    };

    const handleUpload = async () => {
        if (selectedImage) {
            setUploading(true);
            setError(null);
            try {
                const base64 = await imageService.converetImageToBase64(selectedImage);
                await imageService.uploadImage(productId, base64);
                alert('Image uploaded successfully');
            } catch (error) {
                setError('Failed to upload image');
            } finally {
                setUploading(false);
            }
        }
    };

    const handleDelete = async () => {
        setUploading(true);
        setError(null);
        try {
            await imageService.deleteImage(productId);
            setSelectedImage(null);
            setMessage('Image deleted successfully');
            alert('Image deleted successfully');
        } catch (error) {
            setError('Failed to delete image');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {previewUrl && <img src={previewUrl} alt="Image Preview" style={{ width: '200px', height: '200px' }} />}
            <button onClick={handleUpload} disabled={uploading || !selectedImage}>
                {uploading ? 'Uploading...' : 'Upload Image'}
            </button>
            <button onClick={handleDelete} disabled={uploading || !selectedImage}>
                {uploading ? 'Deleting...' : 'Delete Image'}
            </button>
            {message && <p style={{ color: 'green' }}>{message}</p>}
        </div>
    );
};

export default ImagePreview;

function alert(arg0: string) {
    throw new Error(arg0);
}

