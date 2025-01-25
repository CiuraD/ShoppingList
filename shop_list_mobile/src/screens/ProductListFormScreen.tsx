import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProductEditComponent from '../components/ProductEdit.component';

const ProductListFormScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product List Form</Text>
      {/* <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Product Name"
                  style={styles.input}
                /> */}
      <ProductEditComponent onSave={(product) => console.log(product)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default ProductListFormScreen;