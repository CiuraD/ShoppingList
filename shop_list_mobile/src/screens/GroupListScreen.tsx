import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { STORAGE_KEY_USERNAME } from '../constants';
import { storageService } from '../services/storage/storage.service';
import { userGroupService } from '../services/user/userGroup.service';
import { userGroup } from '../services/user/interfaces/userGrup.interface';
import { useNavigateTo } from '../navigation/navigationUtility';

const GroupListScreen: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [groups, setGroups] = useState<userGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigateTo = useNavigateTo();

  useEffect(() => {
    const fetchUserName = async () => {
      const storedUserName = await storageService.getItem(STORAGE_KEY_USERNAME);
      if (storedUserName) {
        setUsername(storedUserName);
        setError(null);
      } else {
        setError('No user name found in storage');
        setLoading(false);
      }
    };

    fetchUserName();
  }, []);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        if (!username) {
          return;
        }

        const fetchedGroups = await userGroupService.getUserGroupsForUser(username);
        setGroups(fetchedGroups);

      } catch (fetchError) {
        console.error(fetchError);
        setError('Failed to fetch groups');

      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchGroups();
    }
  }, [username]);

  const handleGroupDelete = async (groupId: string) => {
    try {
      await userGroupService.deleteGroup(groupId);
      setGroups(groups.filter(group => group.id !== groupId));

    } catch (deleteError) {
      console.error(deleteError);
      setError('Failed to delete group');
    }
  };

  const handleGroupLeve = async (groupId: string) => {
    try {
      if (username) {
        await userGroupService.leaveGroup(username, groupId);
      } else {
        setError('Username is null');
      }
      setGroups(groups.filter(group => group.id !== groupId));

    } catch (leaveError) {
      console.error(leaveError);
      setError('Failed to leave group');
    }
  };

  const renderItem = ({ item }: { item: userGroup }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Get Code" onPress={() => {}} />
        {item.creatorName === username ? (
            <View>
                <Button title="Edit" onPress={() => { navigateTo[1]('GroupForm', { group: item } ); }} />
                <Button title="Delete" onPress={() => { handleGroupDelete(item.id); }} />
            </View>
        ) : (
            <View>
                <Button title="Leave" onPress={() => { handleGroupLeve(item.id); }} />
            </View>
        )}
      </View>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={{ color: 'red' }}>aa{error}</Text>;
  }

  return (
    <View style={styles.container}>
        <View style={styles.buttonContainer}>
            <Button title="Create Group" onPress={() => { navigateTo[1]('GroupForm', { group: null } );}} />
            <Button title="Join Group" onPress={() => {}} />
        </View>
      <FlatList
        style={styles.list}
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  list: {
    marginTop: 20,
  },
});

export default GroupListScreen;
