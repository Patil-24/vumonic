import React, {useEffect} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
// Destructuring width and height from Dimensions
const {width, height} = Dimensions.get('window');

// Splash component with navigation prop
const Splash = ({navigation}) => {
  // useEffect hook to navigate after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      // Navigate to 'Login' screen after 3000 milliseconds (3 seconds)
      navigation.navigate('Login');
    }, 3000);
  }, []); // Empty dependency array means this effect runs once after initial render

  return (
    // View container for the splash screen
    <View style={styles.container}>
      {/* Image component for displaying the logo */}
      <Image
        source={require('../assets/logovumonic.png')} // Image source from assets
        style={styles.logo} // Style for the logo image
        resizeMode="contain" // Resize mode for the image
      />
    </View>
  );
};

export default Splash; // Exporting the Splash component as default

// StyleSheet for styling the components
const styles = StyleSheet.create({
  container: {
    flex: 1, // Flex 1 to make the container take the whole screen
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  logo: {
    // Style for the logo image
    width: width * 0.4, // Width set to 40% of the screen width
    height: height * 0.4, // Height set to 40% of the screen height
  },
});
