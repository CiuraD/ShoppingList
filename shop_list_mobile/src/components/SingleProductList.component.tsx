import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ProductListFull } from '../services/product/interfaces/productListFull.interface';
// import ProductComponent from './Product.component';

interface SingleProductListProps {
    productList: ProductListFull;
}

const SingleProductList: React.FC<SingleProductListProps> = ({ productList }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>{productList.name}</Text>
            <FlatList
                data={productList.products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.productItem}>
                        {/* <ProductComponent {...item} /> */}
                        <Text>{item.name}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginVertical: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    productItem: {
        marginBottom: 20,
    },
});

export default SingleProductList;
