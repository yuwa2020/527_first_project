import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Image, Button } from 'react-native';
import SigninModal from './components/UserSigninScreen';
import UserSignupScreen from './components/UserSignupScreen';
import HomeScreen from './components/HomeScreen';
// import UserSigninScreen from './components/UserSigninScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbgu8qjw6WVjsHEomqxS4ALcCVRjzITHU",
  authDomain: "week4-project-abbd0.firebaseapp.com",
  projectId: "week4-project-abbd0",
  storageBucket: "week4-project-abbd0.appspot.com",
  messagingSenderId: "787508266646",
  appId: "1:787508266646:web:6ee42a3db0053af66764b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Export the auth object and any functions you need
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };


const myImg = require('./assets/icon.png');

const Stack = createStackNavigator();


function LandingScreen({ navigation }) {
  return (
      <View style={styles.container}>
        <Button 
          onPress={() => navigation.navigate('UserSignupScreen')}
          title="Sign up"
          color="#841584" 
          accessibilityLabel="Learn more about this purple button" 
        />
        <SigninModal />
      </View>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      {/* <ScrollView contentContainerStyle={styles.scrollViewContent}> */}
        {/* Header Section */}

        {/* Contact button */}
      {/* </ScrollView> */}

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LandingScreen" component={LandingScreen} />
          <Stack.Screen name="UserSignupScreen" component={UserSignupScreen} />
          <Stack.Screen name="UserSigninScreen" component={SigninModal} />
          <Stack.Screen name="HomeScreen" options={{headerLeft:null, gestureEnabled: false}} component={HomeScreen} />
        </Stack.Navigator>
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
