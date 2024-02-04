import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

// Configure Google sign-in
GoogleSignin.configure({
  webClientId:
    '962724222313-2mcovfr5ivuh4q5nsdol1bjj7cepej0u.apps.googleusercontent.com',
});

// Get screen dimensions
const {width, height} = Dimensions.get('window');

// Login screen component
const Login = ({navigation}) => {
  const [loading, setLoading] = useState(false); // Loading state for activity indicator

  useEffect(() => {
    // Check if user is signed in silently
    const checkIfUserIsSignedIn = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signInSilently();
        if (userInfo) {
          navigation.replace('Home', {userInfo}); // Navigate to Home screen if user is signed in
        }
      } catch (error) {
        console.log('Silent sign in failed, show login screen');
      }
    };

    checkIfUserIsSignedIn(); // Call function to check sign-in status

    // Event listener for network status changes
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Network status changed:', state);
      if (!state.isConnected) {
        Alert.alert(
          'No Internet Connection',
          'Please turn on your internet connection.',
        );
      }
    });

    return () => {
      unsubscribe(); // Cleanup function to unsubscribe from network status changes
    };
  }, [navigation]); // Dependency array to run effect only on navigation change

  // Function to handle Google sign-in
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true); // Set loading state to true
      await GoogleSignin.hasPlayServices(); // Check for Play services
      const userInfo = await GoogleSignin.signIn(); // Sign in with Google
      console.log(userInfo);
      navigation.replace('Home', {userInfo}); // Navigate to Home screen after successful sign-in
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Login cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Login already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available or outdated');
      } else {
        console.log('Something went wrong:', error.message);
      }
    } finally {
      setLoading(false); // Set loading state to false after sign-in process completes
    }
  };

  return (
    // Main container view
    <View style={styles.container}>
      {/* Logo image */}
      <Image
        source={require('../assets/logovumonic.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      {/* Sign in text */}
      <Text style={styles.signInText}>Sign In</Text>
      {/* Google sign-in button */}
      <GoogleSigninButton
        style={styles.googleButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={handleGoogleSignIn}
      />
      {/* Activity indicator while loading */}
      {loading && (
        <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
      )}
    </View>
  );
};

export default Login; // Export Login component

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Background color
  },
  logo: {
    width: width * 0.4, // Logo width
    height: height * 0.2, // Logo height
  },
  signInText: {
    color: 'black', // Sign in text color
    fontSize: 24, // Sign in text font size
    fontWeight: 'bold', // Sign in text font weight
    marginVertical: 20, // Vertical margin
  },
  googleButton: {
    width: width * 0.8, // Google sign-in button width
    height: 60, // Google sign-in button height
  },
  loader: {
    position: 'absolute', // Position
    top: height * 0.5, // Top position
  },
});
