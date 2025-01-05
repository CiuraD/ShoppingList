import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Menu, Provider } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';

const HeaderMenu: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [visible, setVisible] = useState(false);
    const { logout } = useAuth();

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const handleLogout = async () => {
        closeMenu();
        await logout();
    };

    return (
        <Provider>
            <View style={styles.headerRight}>
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                        <TouchableOpacity onPress={openMenu}>
                            <Text style={styles.menuButton}>Menu</Text>
                        </TouchableOpacity>
                    }
                >
                    <Menu.Item onPress={() => { closeMenu(); navigation.navigate('Home'); }} title="Home" />
                    <Menu.Item onPress={() => { closeMenu(); navigation.navigate('ProductLists'); }} title="Product Lists" />
                    <Menu.Item onPress={() => { closeMenu(); navigation.navigate('GroupList'); }} title="Groups" />
                    <Menu.Item onPress={handleLogout} title="Logout" />
                </Menu>
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    headerRight: {
        marginRight: 10,
    },
    menuButton: {
        color: 'blue',
        fontSize: 16,
    },
});

export default HeaderMenu;
