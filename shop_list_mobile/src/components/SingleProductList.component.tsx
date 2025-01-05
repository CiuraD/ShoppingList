import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { ProductListLazy } from '../services/product/interfaces/ProductListLazy.interface';
import { Product } from '../services/product/interfaces/product.interface';
import { productService } from '../services/product/product.service';

interface SingleProductListProps {
    productList: ProductListLazy;
}

const SingleProductList: React.FC<SingleProductListProps> = ({ productList }) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        console.log('SingleProductList productList:', productList);
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await productService.getProductsForList(productList.id);
                setProducts(fetchedProducts);
                console.log('Fetched products:', fetchedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [productList]);

    console.log('product list name:', productList.name);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{productList.name}</Text>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.productItem}>
                        <Text>{item.name}</Text>
                        <Text>Quantity: {item.quantity} - {item.quantityType}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginVertical: 20,
        width: Dimensions.get('window').width - 40, // Full width with padding
        alignSelf: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    productItem: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
});

export default SingleProductList;
