import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux'
import { addBill } from '../features/bills/billsSlice'
import { lineNetwork, waterWorks } from '../constants/JomPay'
export default function SelectBillScreen({ navigation }) {

  selectBillPressed = (bill) => {
    navigation.navigate('InsertBillDetail', { bill })
  }
  return (
    <View style={styles.container}>
      <Text>SELECT BILL</Text>
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
  );
}

SelectBillScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 400,
    backgroundColor: '#fff',
  },
});
