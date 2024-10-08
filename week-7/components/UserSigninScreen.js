import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TextInput, Button, Modal, StyleSheet, TouchableOpacity } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
import { auth,createUserWithEmailAndPassword, firestore } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";


const SigninModal = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const [password, setPassword] = useState("");
    // const [username, setUsername] = useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");


    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
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
                navigation.replace("HomeDrawer");
            }
        },[handleLogin]);

        // Load user data from AsyncStorage
        const loadUserData = async () => {
            try {
                const savedName = await AsyncStorage.getItem("userName");
                const savedEmail = await AsyncStorage.getItem("userEmail");

                if (savedName) {
                    setName(savedName);
                }

                if (savedEmail) {
                    setEmail(savedEmail);
                }

            } catch (error) {
                console.log("Faile to load user data from AsyncStorage", error);
            };
        };
        loadUserData();

        return unsubscribe;
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
            <Button title = "Sign In" onPress={() => setModalVisible(true)} />
            <Modal visible={modalVisible} animationType="slide">
                <View style = {styles.greeting}>
                    {name ? <Text style={styles.inputText}>Welcome back, {name}!</Text> : null}
                </View>
                <View style={styles.modalContent}>
                    <Text>Sign In</Text>
                    <Text>Email</Text>
                    <TextInput
                        placeholder="Username"
                        value={email}
                        onChangeText={text => setEmail(text)}
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
    greeting: {
        padding: 10,
        alignItems: "center",
        
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