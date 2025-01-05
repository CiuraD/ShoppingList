import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type GroupFormScreenRouteProp = RouteProp<{ params: { group?: { name: string; description: string } } }, 'params'>;
type GroupFormScreenNavigationProp = StackNavigationProp<any>;

const GroupFormScreen = ({ route, navigation }: { route: GroupFormScreenRouteProp; navigation: GroupFormScreenNavigationProp }) => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  useEffect(() => {
    if (route.params?.group) {
      const { group } = route.params;
      setGroupName(group.name);
      setGroupDescription(group.description);
    }
  }, [route.params]);

  const handleSave = () => {
    const group = { name: groupName, description: groupDescription };
    if (route.params?.group) {
      // Edit existing group
      // Call your update group API or function here
    } else {
      // Create new group
      // Call your create group API or function here
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