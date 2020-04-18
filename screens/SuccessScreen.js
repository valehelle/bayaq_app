import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { useSelector } from 'react-redux'

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

import { userInfoSelector } from '../features/accounts/userSlice'


export default function SuccessScreen({ navigation }) {

  const user = useSelector(state => state.user)

  return (
    <View className="scrollView" style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}><Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Bayaq</Text></TouchableOpacity>
      <Text style={{ marginTop: 20, color: 'white', fontSize: 14, fontWeight: 'bold' }}>Bill Payment Success</Text>
      <Text style={{ marginTop: 20, color: 'white', fontSize: 14 }}>Thank You for using Bayaq to make your bill payment. We will send an email to <Text style={{ fontWeight: 'bold' }}>{user.email}</Text> with the invoice.</Text>

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
