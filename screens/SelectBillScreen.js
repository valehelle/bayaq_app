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
      <View><Text style={{ color: 'white', fontSize: 16, padding: 10, fontWeight: 'bold' }}>Select Bill</Text></View>
      <View style={{ backgroundColor: 'white', paddingTop: 20, height: '100%', borderTopStartRadius: 10, borderTopEndRadius: 10 }}>
        <View style={{ paddingLeft: 20 }}>
          <TouchableOpacity onPress={backButtonPressed}>
            <Text style={{ color: Colors.primaryColor, textAlign: 'left' }}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10 }}>
          {lineNetwork.map((bill, index) =>
            <View style={{ paddingLeft: 20 }} >
              <TouchableOpacity style={{ borderTopWidth: index != 0 ? 1 : 0, borderBottomWidth: index == lineNetwork.length - 1 ? 1 : 0, paddingVertical: 10, borderColor: "lightgrey" }} onPress={() => selectBillPressed(bill)}>
                <Text style={{ fontWeight: 600 }}>{bill.companyName}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View >
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
