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
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors'



export default function TermsAndConditionScreen({ navigation }) {

  return (

    <View style={{ flex: 1, backgroundColor: Colors.headerColor }}>
      <View style={{ flex: .4, paddingTop: Constants.statusBarHeight, }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
            <Ionicons name="ios-arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={{ height: '100%', justifyContent: 'center' }}>
            <Text style={{ marginBottom: 120, width: '100%', color: 'white', fontSize: 40, fontWeight: 'bold', textAlign: 'center' }}>Terms of Use</Text>

          </View>
        </View>
      </View>
      <View style={{ flex: .8, backgroundColor: 'white', paddingTop: 10, paddingHorizontal: 20 }}>
        <Text style={{ marginTop: 20, fontSize: 14 }}>As a condition of use, you will allow Bayaq to pay bills on your behalf.</Text>
        <Text style={{ marginTop: 20, fontSize: 14 }}>Bayaq will not be responsible for incorrect bill amount or account paid made by you.</Text>
        <Text style={{ marginTop: 20, fontSize: 14 }}>Any information given by you to Bayaq will not be used by Bayaq for anything other than paying your bills.</Text>
        <Text style={{ marginTop: 20, fontSize: 14 }}>Bayaq will not sell your information to 3rd party.</Text>

      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    padding: 20
  },
});
