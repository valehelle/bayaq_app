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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'


import { lineNetwork, waterWorks } from '../constants/JomPay'
import Colors from '../constants/Colors';
export default function SelectBillScreen({ navigation }) {

  const selectBillPressed = (bill) => {
    navigation.navigate('InsertBillDetail', { bill })
  }

  const backButtonPressed = () => {
    navigation.goBack()
  }


  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: 'white', paddingHorizontal: 20, marginTop: 10, paddingTop: 20, height: '100%', borderTopStartRadius: 10, borderTopEndRadius: 10 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: .5, }}>
            <TouchableOpacity onPress={backButtonPressed}>
              <Text style={{ color: Colors.primaryColor, textAlign: 'left' }}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: .5, }}>
            <TouchableOpacity onPress={backButtonPressed}>
              <Text style={{ color: Colors.primaryColor, textAlign: 'right' }}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          {lineNetwork.map((bill) =>
            <TouchableOpacity onPress={() => selectBillPressed(bill)}>
              <Text>{bill.companyName}</Text>
            </TouchableOpacity>
          )}
          {waterWorks.map((bill) =>
            <TouchableOpacity onPress={() => selectBillPressed(bill)}>
              <Text>{bill.companyName}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

SelectBillScreen.navigationOptions = {
  header: null,
};

SelectBillScreen.path = 'select_bill'

SelectBillScreen.defaultNavigationOptions = {
  animationEnabled: false,
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
  },
});
