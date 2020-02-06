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



export default function SuccessScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}><Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>eBayaq</Text></TouchableOpacity>
      <Text style={{ marginTop: 20, color: 'white', fontSize: 14, fontWeight: 'bold' }}>Bill Payment Success</Text>
      <Text style={{ marginTop: 20, color: 'white', fontSize: 14 }}>Thank You for using eBayaq to make your bill payment. We will send an email to you with the invoice.</Text>

    </View>
  );
}

SuccessScreen.navigationOptions = {
  header: null,
};

SuccessScreen.path = ''

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    padding: 20
  },
});
