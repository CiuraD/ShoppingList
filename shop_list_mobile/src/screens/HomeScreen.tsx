import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { productService } from '../services/product/product.service';
import SingleProductList from '../components/SingleProductList.component';
import { ProductListLazy } from '../services/product/interfaces/ProductListLazy.interface';
import { storageService } from '../services/storage/storage.service';
import { STORAGE_KEY_USERNAME } from '../constants';

function HomeScreen() {
  const [userName, setUserName] = useState<string | null>(null);
  const [latestProductList, setLatestProductList] = useState<ProductListLazy | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserName = async () => {
      const storedUserName = await storageService.getItem(STORAGE_KEY_USERNAME);
      if (storedUserName) {
        setUserName(storedUserName);
      } else {
        setError('No user name found in storage');
        setLoading(false);
      }
    };
    fetchUserName();
  }, []);

  useEffect(() => {
    const fetchLatestProductList = async () => {
      if (userName) {
        try {
          const productList = await productService.getLatestProductListForUser(userName);
          setLatestProductList(productList);
        } catch (fetchError) {
          setError('Failed to fetch the latest product list');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchLatestProductList();
  }, [userName]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={{ color: 'red' }}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      {latestProductList ? (
        <SingleProductList productList={latestProductList} />
      ) : (
        <View>
          <Text>No product list found</Text>
          <Button onClick={() => {}} title="Create new List" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
