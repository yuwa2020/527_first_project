import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TextInput, Button, Modal, StyleSheet,TouchableOpacity } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";

import { auth, firestore } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const HomeScreen = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try{
                const user = auth.currentUser;
                if (user){
                    const userDoc = await getDoc(doc(firestore, "users", user.uid));
                    if (userDoc.exists()){
                        setUserData(userDoc.data());
                    } else {
                        console.log("No such document!");
                    }
                }
            } catch (error) {
                console.log("Error getting document:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

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
            <Text style={styles.infoText}>Email: {userData?.email}</Text>
            <Text style={styles.infoText}>Name: {userData?.name}</Text>
            <TouchableOpacity
                onPress={handleLogOut}
                style={styles.button}
            >
                <Text style ={styles.buttonText}>Sign out</Text>
            </TouchableOpacity>
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
    infoText: {
        marginBottom: 10,
        fontSize: 16,
        color: 'gray',
        position: 'top'
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },

});

export default HomeScreen;