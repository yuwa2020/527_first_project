import React,{useState} from "react";
import { View, Text, TextInput, Button, Modal, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";



const SigninModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignin = () => {
        console.log('Username:', username);
        console.log('Password', password);
    };

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
                        <Button title="Submit" onPress={handleSignin} />
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