import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Modal, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import { auth,createUserWithEmailAndPassword } from "../App";

const HomeScreen = () => {
    const navigation = useNavigation();

    const username = auth.currentUser.email;


    const handleLogOut = () => {
        auth
        .signOut()
        .then(() => {
            navigation.replace("LandingScreen");
        })
        .catch(error => alert(error.message));
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
            <Text style={styles.infoText}>Welcome, {username}</Text>
            <Button title="Logout" onPress={handleLogOut} />
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
    },
    infoText: {
        marginBottom: 10,
        fontSize: 16,
    },

});

export default HomeScreen;