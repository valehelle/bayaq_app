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
import Colors from '../constants/Colors'



export default function SupportScreen({ navigation }) {

  return (
    <View className="scrollView" style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Landing')}><Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Bayaq</Text></TouchableOpacity>
      <Text style={{ marginTop: 20, color: 'white', fontSize: 14, fontWeight: 'bold' }}>Support</Text>
      <Text style={{ marginTop: 20, color: 'white', fontSize: 14 }}>If you have any question, feature request, bug findings, you can email <Text style={{ fontWeight: 'bold' }}>admin@bayaqapp.com</Text></Text>
    </View>
  );
}

SupportScreen.navigationOptions = {
  header: null,
};

SupportScreen.path = 'support'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    padding: 20
  },
});
