import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import { auth,createUserWithEmailAndPassword } from "../App";
function UserSignupScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
          <UserDetailsForm />
          {/* <StatueBar style="auto" /> */}
      </ScrollView>
    );
  }

const UserDetailsForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [birthdate, setBirthdate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [country , setCountry] = useState("");
    const [gender, setGender] = useState("");
    const [biography, setBiography] = useState("");
    const [smartphone, setSmartphone] = useState("");

    // Date Picker handler
    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || birthdate;
        setShowDatePicker(Platform.OS === "ios");
        setBirthdate(currentDate);
    }

    // form submission handler
    // const handleSubmit = () => {
    //     console.log("Name:", name);
    //     console.log("Password,", password);
    //     console.log("Email:", email);
    //     console.log("Birthdate:", birthdate);
    //     console.log("Country:", country);
    //     console.log("Gender:", gender);
    //     console.log("Biography:", biography);
    //     console.log("Smartphone:", smartphone);
    // };

    //Registering user
    const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('User registered successfully!', user);
        })
        .catch((error) => {
            alert(error.message);
        });
    };

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
        <View style={styles.container}>
        {/* Biography Input  */}
        <Text style={styles.label}>Email:</Text>
            <TextInput
                style={styles.input}
                placeholder="Write a email"
                multiline
                value={email}
                onChangeText={setEmail}
            />
        {/* Password Input */}
        <Text style={styles.label}>Password:</Text>
            <TextInput
                style={styles.input}
                placeholder="Write a password"
                multiline
                value={password}
                onChangeText={setPassword}
            />

        <Button title="Submit" onPress={handleRegister} />
        
        {/* Name Input */}

        <Text style={styles.label}>Name:</Text>
            <TextInput
                style={styles.input}
                placeholder="Write a name"
                multiline
                value={name}
                onChangeText={setName}
            />
        


         <Text style = {styles.label}>Select Birthdate</Text>
         <Button title = "Select Birthdate" onPress={() => setShowDatePicker(true)} />
         {showDatePicker && (
                <DateTimePicker
                    value={birthdate}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                />
            )}
            <Text style={styles.infoText}>Selected Birthdate: {birthdate.toDateString()}</Text>

            {/* Country Picker */}
            <Text style={styles.infoText}>Selected Country:</Text>
            <RNPickerSelect
                onValueChange={(value) => setCountry(value)}
                items={[
                    { label: "USA", value: "USA" },
                    { label: "Canada", value: "Canada" },
                    { label: "UK", value: "UK" },
                    { label: "India", value: "India" },
                ]}
            style = {pickerSelectStyles}
            placeholder={{ 
                label: "Select your Country", 
                value: null 
            }}
            />
            <Text style={styles.infoText}>Selected Country: {country}</Text>

            
            {/* Gender Picker */}
            <Text style={styles.label}>Select Gender:</Text>
            <RNPickerSelect
                onValueChange={(value) => setGender(value)}
                items={[
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female'},
                    { label: 'Other', value: 'Other'}
                ]}
                style={pickerSelectStyles}
                placeholder={{
                    label: 'Select your gender...',
                    value: null,
                }}
            />
            <Text style={styles.infoText}>Selected Gender: {gender}</Text>

            {/* Biography Input  */}
            <Text style={styles.label}>Biography:</Text>
            <TextInput
                style={styles.input}
                placeholder="Write a brief biography"
                multiline
                value={biography}
                onChangeText={setBiography}
            />
            {/* Smartphone input */}
            <Text style={styles.label}>Select Smartphone:</Text>
            <RNPickerSelect
                onValueChange={(value) => setSmartphone(value)}
                items={[
                    { label: 'iPhone', value: 'iPhone' },
                    { label: 'Android', value: 'Android' },
                ]}
                style={pickerSelectStyles}
                placeholder={{
                    label: 'Select your smartphone...',
                    value: null,
                }}
            />
            
        </View>
        );
    };

    const styles = StyleSheet.create({
        container:{
            padding: 20,
            justifyContent: "center",
        },
        label: {
            marginVertical: 10,
            fontSize: 16,
        },
        textInput: {
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            marginBottom: 10,
            borderRadius: 5,
            height: 100,
        },
        infoText: {
            marginBottom: 10,
            fontSize: 16,
        },
    });

    const pickerSelectStyles = StyleSheet.create({
        inputIOS: {
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 4,
            color: "black",
            paddingRight: 30,
            marginBottom: 10,
        },
        inputAndroid: {
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 4,
            color: "black",
            paddingRight: 30,
            marginBottom: 10,
        },
    });

    export default UserSignupScreen;