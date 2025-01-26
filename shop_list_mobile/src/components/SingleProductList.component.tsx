import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Button, Alert, Modal } from 'react-native';
import { ProductListLazy } from '../services/product/interfaces/ProductListLazy.interface';
import { Product } from '../services/product/interfaces/product.interface';
import { productService } from '../services/product/product.service';
import { storageService } from '../services/storage/storage.service';
import { STORAGE_KEY_USERNAME } from '../constants';
import ProductComponent from './Product.component';
import { useNavigateTo } from '../navigation/navigationUtility';
import ShareList from './ShareList.component';
import UserService from '../services/user/user.service';

interface SingleProductListProps {
    productList: ProductListLazy;
}

const SingleProductList: React.FC<SingleProductListProps> = ({ productList }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [username, setUsername] = useState<string | null>(null);
    const [userID, setUserID] = useState<string | null>(null);
    const [listName, setListName] = useState<string>('');
    const [listId, setListId] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const navigateTo = useNavigateTo();

    useEffect(() => {
        const fetchUserName = async () => {
          const storedUserName = await storageService.getItem(STORAGE_KEY_USERNAME);
          if (storedUserName) {
            setUsername(storedUserName);
            const userId = await UserService.getUserId(username ? username : '');
            setUserID(userId);
          }
        };

        fetchUserName();
    }, [username]);

    useEffect(() => {
        if (productList) {
            setListName(productList.name);
            setListId(productList.id);
        }
    }, [productList]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await productService.getProductsForList(productList.id);
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [productList]);

    const handleEdit = () => {
        navigateTo[1]('ProductListForm', { productList: { productListID: listId, productListName: listName } });
    };

    const handleDeleteList = async (listID: string) => {
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
                                await productService.deleteList(listID);
                                navigateTo[0]('Home');
                            } catch (deleteError) {
                                setError('Failed to delete list');
                            }
                        },
                    },
                ],
                { cancelable: true }
            );
        };
    
        const handleShareList = () => {
            setModalVisible(true);
        };
    
        const handleUnshareList = async (listID: string) => {
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
                                await productService.unshareList(listID);
                                navigateTo[0]('Home');
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
                'Operation complited successfully',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            setModalVisible(false);
                            navigateTo[0]('Home');
                        },
                    },
                ],
                { cancelable: false }
            );
        };

    return (
        <View style={styles.container}>
            <View style={styles.listHeader}>
                <Text style={styles.header}>{productList.name}</Text>
                <View style={styles.buttonContainer}>
                    <Button title="Edit" onPress={() => { handleEdit(); }} />
                    {productList.userId === userID && (
                        productList.userGroupId ? (
                            <Button title="Unshare" onPress={() => {handleUnshareList(listId)}} />
                        ) : (
                            <Button title="Share" onPress={() => {handleShareList()}} />
                        )
                    )}
                    {productList.userId === userID && (
                        <Button title="Delete" onPress={() =>{handleDeleteList(listId)}} />
                    )}
                </View>
            </View>
            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <ProductComponent product={item} />
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
                    <ShareList listId={listId} onSuccess={handleSuccess} />
                    <Button title="Close" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
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

export default SingleProductList;
