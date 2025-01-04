import React, { useState, useEffect } from 'react';
import { Product } from '../services/product/interfaces/product.interface';
import { productService } from '../services/product/product.service';
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
    input: {
        margin: '10px 0',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%',
    },
    button: {
        padding: '10px 20px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
    },
};

interface ProductEditProps {
    productId: string;
}

const ProductEdit: React.FC<ProductEditProps> = ({ productId }) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [name, setName] = useState<string>('');
    const [quantityType, setQuantityType] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetchedProduct = await productService.getProductsForList(productId);
                setProduct(fetchedProduct[0]); // Assuming the product list contains only one product
                setName(fetchedProduct[0].name);
                setQuantityType(fetchedProduct[0].quantityType);
                setQuantity(fetchedProduct[0].quantity);
            } catch (fetchError) {
                setError('Failed to fetch product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleSave = async () => {
        //TODO: Implement save functionality after creating EditListScreen
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div style={styles.errorMessage}>{error}</div>;
    }

    return (
        <div style={styles.container}>
            <h1>Edit Product</h1>
            <div style={styles.content}>
                <div style={styles.details}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Product Name"
                        style={styles.input}
                    />
                    <input
                        type="text"
                        value={quantityType}
                        onChange={(e) => setQuantityType(e.target.value)}
                        placeholder="Quantity Type"
                        style={styles.input}
                    />
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        placeholder="Quantity"
                        style={styles.input}
                    />
                    <button onClick={handleSave} style={styles.button}>
                        Save
                    </button>
                </div>
                <div>
                    {product && product.imageString && <img src={product.imageString} alt="Product" style={styles.image} />}
                    {product && <ImagePreview productId={product.id} />}
                </div>
            </div>
        </div>
    );
};

export default ProductEdit;