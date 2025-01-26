import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Product } from '../services/product/interfaces/product.interface';
// import ImagePreview from './ImagePreview.component';

interface ProductComponentProps {
    product: Product;
  }

  const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginVertical: 20,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    details: {
        flex: 1,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    errorMessage: {
        color: 'red',
    },
});

const ProductComponent: React.FC<ProductComponentProps> = ({ product }) => {
    return (
        <View style={styles.container}>
            <Text>{product.name}</Text>
            <View style={styles.content}>
                <View style={styles.details}>
                    <Text>{product.quantityType}</Text>
                    <Text>Quantity: {product.quantity}</Text>
                </View>
                <View>
                    {product.imageString && <Image source={{ uri: product.imageString }} style={styles.image} />}
                    {/* <ImagePreview productId={product.id} /> */}
                </View>
            </View>
        </View>
    );
};

export default ProductComponent;
