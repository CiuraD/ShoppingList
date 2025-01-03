import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useNavigateTo } from '../navigation/navigationUtility';

const RegisterScreen: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const { register } = useAuth();
    const navigateTo = useNavigateTo();

    const handleRegister = async () => {
        if (!username || !email || !password || !confirmPassword) {
            setError('All fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            await register(username, email, password);
            navigateTo('Login');
        } catch (registerError) {
            console.log('Register error:', registerError);
            setError('Registration failed. Please check your details and try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <Button title="Register" onPress={handleRegister} />
            <Button title="Go to Login" onPress={() => navigateTo('Login')} />
            {error && <Text style={styles.errorMessage}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    errorMessage: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
});

export default RegisterScreen;
