import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Modal, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { auth } from "../App";
import { useNavigation } from "@react-navigation/core";


const SigninModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User logged in successfully!', user);
            // navigation.replace('HomeScreen');
        })
        .catch((error) => {
            alert(error.message);
        });
    }

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigation.replace("HomeScreen");
            }
        });
        return unsubscribe;
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
            <Button title = "Sign In" onPress={() => setModalVisible(true)} />
            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContent}>
                    <Text>Sign In</Text>
                    <Text>Username</Text>
                    <TextInput
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        style={styles.input}
                    />
                    <Text>Password</Text>
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                        secureTextEntry
                    />
                        <Button title="Submit" onPress={handleLogin} />
                        <Button title="Close" onPress={() => setModalVisible(false)} />
                </View>
        </Modal>
    </View>
    </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modalContent: {
        width: 400,
        padding: 50,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center"
    },
    input: {
        borderBottomWidth: 1,
        width: 200,
        marginBottom: 10
    },
    inputText: {
        marginBottom: 10,
        color: 'gray'
    }

});



export default SigninModal;