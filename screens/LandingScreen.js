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

export default function LandingScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <Text>Landing</Text>
    </View>
  );
}

LandingScreen.navigationOptions = {
  header: null,
};
LandingScreen.path = ''

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 400,
    backgroundColor: '#fff',
  },
});
