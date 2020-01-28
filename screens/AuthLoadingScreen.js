import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';

export default function AuthLoadingScreen({ navigation }) {

  async function isLoggedIn(navigation) {
    try {
      const value = await AsyncStorage.getItem('bayaqUserInfo');
      navigation.navigate(value ? 'Main' : 'Landing');
    } catch (error) {
      console.log(error)
      // Error retrieving data
    }
  }

  useEffect(() => {
    isLoggedIn(navigation)
  }, [])

  return (
    <View style={styles.container}>
      <Text>Loading</Text>
    </View>
  );
}

AuthLoadingScreen.navigationOptions = {
  header: null,
};

AuthLoadingScreen.path = ''

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 400,
    backgroundColor: '#fff',
  },
});
