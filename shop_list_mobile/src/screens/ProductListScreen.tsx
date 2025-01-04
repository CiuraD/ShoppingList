import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, ActivityIndicator } from 'react-native';
import { ProductListLazy } from '../services/product/interfaces/productListLazy.interface';
import { productService } from '../services/product/product.service';
import { storageService } from '../services/storage/storage.service';
import { STORAGE_KEY_USERNAME } from '../constants';

const ProductListScreen: React.FC = () => {
    const [userName, setUserName] = useState<string | null>(null);
    const [productLists, setProductLists] = useState<ProductListLazy[]>([]);
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
        if (userName) {
            const fetchProductLists = async () => {
                try {
                    const lists = await productService.getProductListsForUser(userName);
                    setProductLists(lists);
                } catch (fetchError) {
                    setError('Failed to fetch product lists');
                } finally {
                    setLoading(false);
                }
            };

            fetchProductLists();
        }
    }, [userName]);

    const handleDeleteList = async (listId: string) => {
        Alert.alert(
            'Delete List',
            'Are you sure you want to delete this list?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await productService.deleteList(listId);
                            setProductLists(productLists.filter(list => list.id !== listId));
                        } catch (deleteError) {
                            setError('Failed to delete list');
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={{ color: 'red' }}>{error}</Text>;
    }

    return (
        <View>
            <FlatList
                data={productLists}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                        <Text>{item.name}</Text>
                        <Button title="Delete" onPress={() => handleDeleteList(item.id)} />
                    </View>
                )}
            />
        </View>
    );
};

export default ProductListScreen;
