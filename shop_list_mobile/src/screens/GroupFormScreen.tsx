import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { userGroupService } from '../services/user/userGroup.service';
import { storageService } from '../services/storage/storage.service';
import { STORAGE_KEY_USERNAME } from '../constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type GroupFormScreenRouteProp = RouteProp<{ params: { group?: { name: string; description: string } } }, 'params'>;
type GroupFormScreenNavigationProp = StackNavigationProp<any>;

const GroupFormScreen = ({ route, navigation }: { route: GroupFormScreenRouteProp; navigation: GroupFormScreenNavigationProp }) => {
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    if (route.params?.group) {
      console.log('Editing group:', route.params.group);
      const { group } = route.params;
      setGroupName(group.name);
    }
  }, [route.params]);

  const handleSave = async () => {
    const group = { name: groupName };

    const getUsername = async () => {
      const username = await storageService.getItem(STORAGE_KEY_USERNAME);
      return username;
    };

    const username = await getUsername();
    if (route.params?.group) {
      // Edit existing group
      // Call your update group API or function here
    } else {
      if (username) {
        console.log('Creating group:', group);
        userGroupService.createGroup(username, group.name);
      } else {
        console.error('Username is not available');
      }
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Group Name</Text>
      <TextInput
        style={styles.input}
        value={groupName}
        onChangeText={setGroupName}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default GroupFormScreen;
