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
    <View className="scrollView" style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Landing')}><Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Bayaq</Text></TouchableOpacity>
      <Text style={{ marginTop: 20, color: 'white', fontSize: 14, fontWeight: 'bold' }}>Terms and Condition</Text>
      <Text style={{ marginTop: 20, color: 'white', fontSize: 14 }}>As a condition of use, you will allow Bayaq to pay bills on your behalf.</Text>
      <Text style={{ marginTop: 20, color: 'white', fontSize: 14 }}>Bayaq will not be responsible for incorrect bill amount or account paid made by you.</Text>
      <Text style={{ marginTop: 20, color: 'white', fontSize: 14 }}>Any information given by you to Bayaq will not be used by Bayaq for anything other than paying your bills.</Text>
      <Text style={{ marginTop: 20, color: 'white', fontSize: 14 }}>Bayaq will not sell your information to 3rd party.</Text>


      <Text style={{ marginTop: 20, color: 'white', fontSize: 14, fontWeight: 'bold' }}>Privacy</Text>
      <Text style={{ marginTop: 20, color: 'white', fontSize: 14 }}>Any information and data given by you to Bayaq will not be used by Bayaq for anything other than paying your bills.</Text>
      <Text style={{ marginTop: 20, color: 'white', fontSize: 14 }}>Bayaq will not sell your information and data to 3rd party or use any of your data in a malicios way.</Text>


    </View>
  );
}

TermsAndConditionScreen.navigationOptions = {
  header: null,
};

TermsAndConditionScreen.path = 'privacy'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    padding: 20
  },
});
