import React from 'react';
import { Product } from '../services/product/interfaces/product.interface';
import ImagePreview from './ImagePreview.component';

const styles = {
    container: {
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        margin: '20px 0',
    },
    content: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    details: {
        flex: 1,
    },
    image: {
        width: '200px',
        height: '200px',
        objectFit: 'cover' as 'cover',
        borderRadius: '8px',
    },
    errorMessage: {
        color: 'red',
    },
};

const ProductComponent: React.FC<Product> = (product: Product) => {

    return (
        <div style={styles.container}>
            <h1>Product {product.name}</h1>
            <div style={styles.content}>
                <div style={styles.details}>
                    <p>{product.quantityType}</p>
                    <p>Quantity: {product.quantity}</p>
                </div>
                <div>
                    {product.imageString && <img src={product.imageString} alt="Product" style={styles.image} />}
                    <ImagePreview productId={product.id} />
                </div>
            </div>
        </div>
    );
};

export default ProductComponent;
