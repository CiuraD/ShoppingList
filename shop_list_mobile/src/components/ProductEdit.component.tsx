import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Product } from '../services/product/interfaces/product.interface';
// import { productService } from '../services/product/product.service';
// import ImagePreview from './ImagePreview.component';
import { QuantityType } from '../services/product/enums/quantity-type.enum';

interface ProductEditProps {
  product?: Product;
  onSave: (product: Product) => void;
}

const ProductEdit: React.FC<ProductEditProps> = ({ product, onSave }) => {
  const [name, setName] = useState<string>(product?.name || '');
  const [quantityType, setQuantityType] = useState<QuantityType>(product?.quantityType || QuantityType.LENGTH);
  const [quantity, setQuantity] = useState<number>(product?.quantity || 0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setLoading(true);
    try {
      const newProduct: Product = {
        ...product,
        name,
        quantityType,
        quantity,
        id: product?.id || '',
        imageString: product?.imageString || '',
      };
       // Assuming saveProduct handles both create and update
      onSave(newProduct);
    } catch (saveError) {
      setError('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  if (error) {
    return <Text style={styles.errorMessage}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product ? 'Edit Product' : 'Create Product'}</Text>
      <View style={styles.content}>
        <View style={styles.details}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Product Name"
            style={styles.input}
          />
          <View style={styles.input}>
            <Picker
              selectedValue={quantityType}
              onValueChange={(itemValue) => setQuantityType(itemValue)}
            >
              <Picker.Item label="Length" value={QuantityType.LENGTH} />
              <Picker.Item label="Weight" value={QuantityType.MASS} />
              <Picker.Item label="Volume" value={QuantityType.VOLUME} />
            </Picker>
          </View>
          <TextInput
            value={String(quantity)}
            onChangeText={(text) => setQuantity(Number(text))}
            placeholder="Quantity"
            keyboardType="numeric"
            style={styles.input}
          />
          <Button title="Save" onPress={handleSave} />
        </View>
        <View>
          {product && product.imageString && (
            <Image source={{ uri: product.imageString }} style={styles.image} />
          )}
          {/* {product && <ImagePreview productId={product.id} />} */}
        </View>
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  input: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
});

export default ProductEdit;
