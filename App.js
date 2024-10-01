import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';

const Stack = createNativeStackNavigator();

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyC9wxSx5csDL0h0JtX0T2KHmfNPlBacRQs",
    authDomain: "chat-app-59ae3.firebaseapp.com",
    projectId: "chat-app-59ae3",
    storageBucket: "chat-app-59ae3.appspot.com",
    messagingSenderId: "482336031809",
    appId: "1:482336031809:web:309d51e015ad6048a772c0"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={Start} />
        <Stack.Screen
          name="Chat">
          {props => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});