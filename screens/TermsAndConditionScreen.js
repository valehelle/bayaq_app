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



export default function TermsAndConditionScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Landing')}><Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>eBayaq</Text></TouchableOpacity>
      <Text style={{ marginTop: 20, color: 'white', fontSize: 14, fontWeight: 'bold' }}>Terms and Condition</Text>
      <Text style={{ marginTop: 20, color: 'white', fontSize: 14 }}>As a condition of use, you will allow eBayaq to pay bills on your behalf.</Text>
      <Text style={{ marginTop: 20, color: 'white', fontSize: 14 }}>eBayaq will not be responsible for incorrect bill amount or account paid made by you.</Text>
      <Text style={{ marginTop: 20, color: 'white', fontSize: 14 }}>Any information given by you to pBayaq will not be used by pBayaq for anything other than paying your bills.</Text>
      <Text style={{ marginTop: 20, color: 'white', fontSize: 14 }}>eBayaq will not sell your information to 3rd party.</Text>

    </View>
  );
}

TermsAndConditionScreen.navigationOptions = {
  header: null,
};

TermsAndConditionScreen.path = '/terms_and_conditions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    padding: 20
  },
});
