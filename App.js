// App.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Splash from './screens/Splash'; // Import Splash screen component
import Login from './screens/Login'; // Import Login screen component
import Home from './screens/Home'; // Import Home screen component
import Profile from './screens/Profile'; // Import Profile screen component

const Stack = createStackNavigator(); // Create stack navigator

// Main component of the app
const App = () => {
  return (
    // Navigation container for managing navigation state
    <NavigationContainer>
      {/* Stack navigator for managing navigation between screens */}
      <Stack.Navigator initialRouteName="Splash">
        {/* Splash screen */}
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}} // Hide header for Splash screen
        />
        {/* Login screen */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}} // Hide header for Login screen
        />
        {/* Home screen */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}} // Hide header for Home screen
        />
        {/* Profile screen */}
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}} // Hide header for Profile screen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App; // Export App component
