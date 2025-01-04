import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { userGroup } from '../services/user/interfaces/userGrup.interface';
import { userGroupService } from '../services/user/userGroup.service';
import { storageService } from '../services/storage/storage.service';
import { productService } from '../services/product/product.service';
import { STORAGE_KEY_USERNAME } from '../constants';

interface ShareListProps {
    listId: string;
    onSuccess: () => void;
}

const ShareList: React.FC<ShareListProps> = ({ listId, onSuccess }) => {
    const [userGroups, setUserGroups] = useState<userGroup[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);

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
            const fetchUserGroups = async () => {
                try {
                    const groups = await userGroupService.getUserGroupsForUser(userName);
                    setUserGroups(groups);
                    setSelectedGroupId(groups[0].id);
                    console.log('User Groups:', groups);
                    console.log('listID ', listId);
                } catch (fetchError) {
                    setError('Failed to fetch user groups');
                } finally {
                    setLoading(false);
                }
            };

            fetchUserGroups();
        }
    }, [userName,listId]);

    const handleShare = async () => {
        if (selectedGroupId) {
            try {
                console.log('selectedGroupId', selectedGroupId);
                await productService.shareList(listId, selectedGroupId);
                onSuccess();
            } catch (shareError) {
                Alert.alert('Failed to share list');
            }
        } else {
            Alert.alert('Error', 'Please select a group to share with');
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={{ color: 'red' }}>{error}</Text>;
    }

    return (
        <View style={styles.container}>
        {userGroups.length === 0 ? (
            <Text>No groups found</Text>
        ) : (
            <>
                <Text>Select a group to share the list with:</Text>
                <Picker
                    selectedValue={selectedGroupId}
                    onValueChange={(itemValue) => setSelectedGroupId(itemValue)}
                >
                    {userGroups.map((group) => (
                        <Picker.Item key={group.id} label={group.name} value={group.id} />
                    ))}
                </Picker>
                <Button title="Share List" onPress={handleShare} />
            </>
        )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    picker: {
        height: 50,
        width: '100%',
    },
});

export default ShareList;
