import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button, Alert, useState} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const myImg = require('./assets/icon.png');

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
      <Text>Home Screen</Text>
  );
}

function SettingsScreen() {
  return (
      <Text> Setting Screen</Text>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome to My App</Text>
        </View>

        {/* Main Image */}
        <Image
          source={myImg}
          style={styles.mainImage}
        />

        {/* About Section */}
        <View style={styles.about}>
          <Text style={styles.aboutText}>About Us</Text>
          <Text style={styles.sectionText}>
            This is the about section
          </Text>
        </View>

        {/* Contact button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Contact Us"
            color="#4CAF50"
            onPress={() => Alert.alert('Button Pressed', 'You pressed the Contact Us button!')}
          />
        </View>
      </ScrollView>

      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
  },
  header: {
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  mainImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  about: {
    padding: 16,
  },
  aboutText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionText: {
    fontSize: 16,
  },
  buttonContainer: {
    padding: 16,
  },
});