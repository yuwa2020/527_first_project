import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, Button, Modal, StyleSheet,TouchableOpacity, Animated, PanResponder } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";

import { auth, firestore } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const HomeScreen = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const pan = useRef(new Animated.ValueXY()).current;

    const FadeInView = (props) => {
        const fadeAnim = useRef(new Animated.Value(0)).current;

        useEffect(() => {
            Animated.timing(
                fadeAnim,
                {
                    toValue: 1,
                    duration: 3000,
                    useNativeDriver: true
                }
            ).start();
        }, [fadeAnim]);

        return (
            <Animated.View
                style={{
                    ...props.style,
                    opacity: fadeAnim
                }}>
                {props.children}
                </Animated.View>
        );
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}],
                {useNativeDriver: false}
            ),
            onPanResponderRelease: () => {
                pan.extractOffset();
            }
        })
    ).current;

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
            <View 
            style ={{
                flex:1, 
                alignItems: "center",
                justifyContent: "center", 
                }}>
            <FadeInView 
                style={{
                    width: 250, 
                    height: 70, 
                    backgroundColor: 'powderblue',
                }}>
                <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>
                    Logged In
                </Text>
            </FadeInView>
        </View>
        <View style ={styles.container}>
            <Animated.View
                style={{
                    transform: [{translateX: pan.x}, {translateY: pan.y}]
                }}
                {...panResponder.panHandlers}>
                <View style ={styles.box}>
                    <Text style={{color: 'white', textAlign: 'center', marginTop: 65}}>Drag me!</Text>
                </View>
            </Animated.View>
        </View>
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
    dragContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    titleText: {
        fontSize: 14,
        lineHeight: 24,
        fontWeight: 'bold',
    },
    box: {
        height: 150,
        width: 150,
        backgroundColor: 'blue',
        borderRadius: 5,
    },

});

export default HomeScreen;