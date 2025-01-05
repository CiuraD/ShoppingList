import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { STORAGE_KEY_USERNAME } from '../constants';
import { storageService } from '../services/storage/storage.service';
import { userGroupService } from '../services/user/userGroup.service';
import { userGroup } from '../services/user/interfaces/userGrup.interface';

const GroupListScreen: React.FC = () => {
  const [groups, setGroups] = useState<userGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const username = await storageService.getItem(STORAGE_KEY_USERNAME);
        if (!username) {
          throw new Error('Username not found in storage');
        }
        const fetchedGroups = await userGroupService.getUserGroupsForUser(username);
        setGroups(fetchedGroups);
      } catch (fetchError) {
        setError('Failed to fetch groups');
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const renderItem = ({ item }: { item: userGroup }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={{ color: 'red' }}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={groups}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  item: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 24,
  },
});

export default GroupListScreen;
