import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Modal, Button, Clipboard, TextInput } from 'react-native';
import { STORAGE_KEY_USERNAME } from '../constants';
import { storageService } from '../services/storage/storage.service';
import { userGroupService } from '../services/user/userGroup.service';
import { userGroup } from '../services/user/interfaces/userGrup.interface';
import { useNavigateTo } from '../navigation/navigationUtility';
import {InvitationCode} from '../services/user/interfaces/invitationCode.interface';

const GroupListScreen: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [groups, setGroups] = useState<userGroup[]>([]);
  const [invitationCodes, setInvitationCodes] = useState<InvitationCode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [joiningModalVisible, setJoiningModalVisible] = useState(false);
  const [invitationCode, setInvitationCode] = useState('');
  const [joinCode, setJoinCode] = useState('');

  const navigateTo = useNavigateTo();

  

  const copyToClipboard = () => {
    Clipboard.setString(invitationCode);
  };

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
      console.log('Fetching groups');
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

  useEffect(() => {
    const fetchInvitationCodes = async () => {
      console.log('Fetching invitation codes');
      try {
        if (!username) {
          return;
        }

        const fetchedInvitationCodes = await userGroupService.getInvitationCodesForUser(username);
        setInvitationCodes(fetchedInvitationCodes);

      } catch (fetchError) {
        console.error(fetchError);
        setError('Failed to fetch invitation codes');
      }
    };

    if (username) {
      fetchInvitationCodes();
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

  const createInvitationCode = async (userGroupId: string) => {
    try {
      if (username) {
        const newInvitationCode = await userGroupService.createInvitationCode(username, userGroupId);
        setInvitationCode(newInvitationCode);
      } else {
        setError('Username is null');
      }
    } catch (createError) {
      console.error(createError);
      setError('Failed to create invitation code');
    }
  };

  const displayInvitationCode = (invitationCodeDisplay: string) => {
    setInvitationCode(invitationCodeDisplay);
    setModalVisible(true);
  };

  const handleGetCode = async (userGroupId: string) => {
    if (!invitationCodes.some(code => code.userGroupId === userGroupId)) {
      await createInvitationCode(userGroupId);
    }
    displayInvitationCode(invitationCodes.find(code => code.userGroupId === userGroupId)?.code || invitationCode);
  };

  const handleJoin = async () => {
    try {
      if (username) {
        await userGroupService.joinGroup(username, joinCode);
        setJoiningModalVisible(false);
      } else {
        setError('Username is null');
      }
    } catch (joinError) {
      console.error(joinError);
      setError('Failed to join group');
    }
  };

  const handleJoinGroup = () => {
    setJoiningModalVisible(true);
  };

  const renderItem = ({ item }: { item: userGroup }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Get Code" onPress={() => { handleGetCode(item.id); }} />
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
            <Text>Invitation Code: {invitationCode}</Text>
            <Button title="Copy Code" onPress={copyToClipboard} />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={joiningModalVisible}
        onRequestClose={() => {
          setJoiningModalVisible(!joiningModalVisible);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
            <Text>Enter Code</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              onChangeText={setJoinCode}
              value={joinCode}
            />
            <Button title="Join" onPress={handleJoin} />
            <Button title="Close" onPress={() => setJoiningModalVisible(false)} />
          </View>
        </View>
      </Modal>

        <View style={styles.buttonContainer}>
            <Button title="Create Group" onPress={() => { navigateTo[1]('GroupForm', { group: null } );}} />
            <Button title="Join Group" onPress={() => { handleJoinGroup }} />
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
