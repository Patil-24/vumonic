import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  useColorScheme,
} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/Ionicons';

// Profile screen component
const Profile = ({navigation, route}) => {
  const userInfo = route.params.userInfo; // Get user info from navigation params
  const colorScheme = useColorScheme(); // Get color scheme for dynamic styling
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Function to handle logout
  const handleLogout = async () => {
    try {
      setLoading(true);
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      navigation.replace('Login');
    } catch (error) {
      console.error('Error logging out:', error);
      setLoading(false);
      Alert.alert('Logout Unsuccessful', 'Please try again later.');
    }
  };

  // Function to get text color based on color scheme
  const getTextColor = () => {
    return colorScheme === 'dark' ? 'black' : 'black';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text
          style={[
            styles.headerTitle,
            {color: getTextColor(), fontWeight: 'bold'},
          ]}>
          Profile
        </Text>
      </View>
      {/* User info card */}
      <View style={styles.card}>
        <Image source={{uri: userInfo.user.photo}} style={styles.avatar} />
        <Text
          style={[styles.text, {color: getTextColor(), fontWeight: 'bold'}]}>
          {userInfo.user.name}
        </Text>
        <Text style={[styles.text, {color: getTextColor()}]}>
          {userInfo.user.email}
        </Text>
        {/* Logout button */}
        <TouchableOpacity onPress={handleLogout} style={styles.button}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>Logout</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile; // Export Profile component

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  backButton: {
    padding: 8,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  text: {
    marginTop: 10,
    fontSize: 18,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4285F4',
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
