import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Modal, FlatList } from 'react-native';
import ProductEditComponent from '../components/ProductEdit.component';
import { Product } from '../services/product/interfaces/product.interface';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useNavigateTo } from '../navigation/navigationUtility';
import { productService } from '../services/product/product.service';
import { ProductListFull } from '../services/product/interfaces/productListFull.interface';
import ProductComponent from '../components/Product.component';

type ProductListFormScreenRouteProp = RouteProp<{ params: { productList?: { productListID: string; productListName: string; } } }, 'params'>;
type ProductListScreenNavigationProp = StackNavigationProp<any>;

const ProductListFormScreen = ({ route }: { route: ProductListFormScreenRouteProp; navigation: ProductListScreenNavigationProp }) => {
  const [listName, setListName] = useState('');
  const [productListID, setProductListID] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>([]);

  const navigateTo = useNavigateTo();

  useEffect(() => {
    if (route.params?.productList) {
      const { productList } = route.params;
      setListName(productList.productListName);
      setProductListID(productList.productListID);
    }
  }, [route.params]);

  useEffect(() => {
    if (productListID) {
      const fetchProducts = async () => {
        const productList = await productService.getProductsForList(productListID);
        setProducts(productList);
      };

      fetchProducts();
    }
  }, [productListID]);

  const handleAddProduct = () => {
    setSelectedProduct(undefined);
    setModalVisible(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleDeleteProduct = (product: Product) => {
    const newProducts = products.filter((p) => p.id !== product.id);
    setProducts(newProducts);
  };

  const handleSaveProduct = (product: Product) => {
    if (selectedProduct) {
      const index = products.findIndex((p) => p.id === product.id);
      const newProducts = [...products];
      newProducts[index] = product;
      setProducts(newProducts);
    } else {
      setProducts([...products, product]);
    }
    setModalVisible(false);
  };

  const handleOnSaveList = () => {
    if (productListID) {
      updateProductList();
    } else {
      newProductList();
    }
    navigateTo[0]('ProductLists');
  };

  const newProductList = async () => {
    const list: ProductListFull = {
      name: listName,
      products: products,
    };
    await productService.createList(list);
  };

  const updateProductList = async () => {
    const list: ProductListFull = {
      id: productListID,
      name: listName,
      products: products,
    };

    await productService.updateList(list);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product List Form</Text>
      <TextInput
        value={listName}
        onChangeText={setListName}
        placeholder="Product List Name"
      />
      <Button title="Add Product" onPress={handleAddProduct} />

      <FlatList
                data={products}
                renderItem={({ item }) => (
                    <View>
                        <ProductComponent product={item} />
                        <Button title="Edit Product" onPress={() => handleEditProduct(item)} />
                        <Button title="Delete Product" onPress={() => handleDeleteProduct(item)} />
                    </View>
                )}
            />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <ProductEditComponent
            product={selectedProduct}
            onSave={handleSaveProduct}
          />
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

        <Button title="Save" onPress={() => handleOnSaveList()} />
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
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
  },
});

export default ProductListFormScreen;
