import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import { ProductListLazy } from '../services/product/interfaces/productListLazy.interface';
import { productService } from '../services/product/product.service';
import { storageService } from '../services/storage/storage.service';
import { STORAGE_KEY_USERNAME } from '../constants';
import ShareList from '../components/ShareList.component';
import SingleProductList from '../components/SingleProductList.component';

const ProductListScreen: React.FC = () => {
    const [userName, setUserName] = useState<string | null>(null);
    const [productLists, setProductLists] = useState<ProductListLazy[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedListId, setSelectedListId] = useState<string | null>(null);
    const [refresh, setRefresh] = useState(false);
    const [selectedProductList, setSelectedProductList] = useState<ProductListLazy | null>(null);

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
    }, [userName, refresh]);

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
                            setRefresh(!refresh);
                        } catch (deleteError) {
                            setError('Failed to delete list');
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const handleShareList = (listId: string) => {
        setSelectedListId(listId);
        setModalVisible(true);
    };

    const handleUnshareList = async (listId: string) => {
        Alert.alert(
            'Unshare List',
            'Are you sure you want to unshare this list?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Unshare',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await productService.unshareList(listId);
                            setRefresh(!refresh);
                        } catch (deleteError) {
                            setError('Failed to unshare list');
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const handleSuccess = () => {
        Alert.alert(
            'Success',
            'Operation completed successfully',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        setModalVisible(false);
                        setRefresh(!refresh);
                    },
                },
            ],
            { cancelable: false }
        );
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={{ color: 'red' }}>{error}</Text>;
    }

    if (selectedProductList) {
        console.log('ProductListScreen selectedProductList:', selectedProductList);
        return (
        <View style={{ flex: 1 }}>
            <Button title="Back" onPress={() => setSelectedProductList(null)} />
            <SingleProductList productList={selectedProductList} />
        </View>
        );
    }

    return (
        <View>
            <FlatList
                data={productLists}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                        <Text>{item.name}</Text>
                        <Text>Number of products: {item.productsId.length}</Text>
                        <View style={styles.buttonContainer}>
                            <Button title="Edit" onPress={() => {/* handle edit */}} />
                                {item.userId === userName && (
                                    item.userGroupId ? (
                                        <Button title="Unshare" onPress={() => handleUnshareList(item.id)} />
                                    ) : (
                                        <Button title="Share" onPress={() => handleShareList(item.id)} />
                                    )
                                )}
                                {item.userId === userName && (
                                    <Button title="Delete" onPress={() => handleDeleteList(item.id)} />
                                )}
                                <Button title="View" onPress={() =>  setSelectedProductList(item)} />
                        </View>
                    </View>
                )}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>
                    <ShareList listId={selectedListId!} onSuccess={handleSuccess} />
                    <Button title="Close" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default ProductListScreen;
