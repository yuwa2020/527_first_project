import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Image, Button } from 'react-native';
import SigninModal from './components/UserSigninScreen';
import UserSignupScreen from './components/UserSignupScreen';
import HomeScreen from './components/HomeScreen';
import ImagePickerScreen from './components/ImagePickerScreen';
import LocationScreen from './components/LocationScreen';
// import UserSigninScreen from './components/UserSigninScreen';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


const myImg = require('./assets/icon.png');

// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Image Picker" component={ImagePickerScreen} />
      <Drawer.Screen name="Location" component={LocationScreen} />
      {/* <Drawer.Screen name="Sign Out" component={handleLogOut} /> */}
    </Drawer.Navigator>
  );
}


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
        <Stack.Navigator initialRouteName="LandingScreen">
          <Stack.Screen name="LandingScreen" component={LandingScreen} />
          <Stack.Screen name="UserSignupScreen" component={UserSignupScreen} />
          <Stack.Screen name="UserSigninScreen" component={SigninModal} />
          <Stack.Screen name="HomeDrawer" options={{headerShown: false}} component={HomeDrawer} />
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
