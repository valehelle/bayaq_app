import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux'
import { addBill } from '../features/bills/billsSlice'
import { lineNetwork, waterWorks } from '../constants/JomPay'

export default function InsertBillDetailScreen({ navigation }) {
  const dispatch = useDispatch()
  const [jomPay, setJomPay] = useState({
    ref1: '',
    ref2: '',
    billerCode: '',
  })
  useEffect(() => {
    bill = navigation.getParam('bill', 'NO-ID')
    setJomPay({ billerCode: bill.billerCode })
  }, [])
  createBillPressed = () => {

    dispatch(addBill(jomPay))
  }
  return (
    <View style={styles.container}>
      <TextInput
        editable={false}
        maxLength={40}
        value={jomPay.billerCode.toString()}
      />
      <TextInput
        editable
        maxLength={40}
        onChangeText={(text) => setJomPay({ ...jomPay, ref1: text })}
        value={jomPay.ref1}
      />
      <TextInput
        editable
        maxLength={40}
        onChangeText={(text) => setJomPay({ ...jomPay, ref2: text })}
        value={jomPay.ref2}

      />
      <TouchableOpacity onPress={createBillPressed}>
        <Text>Click Me</Text>
      </TouchableOpacity>
    </View>
  );
}

InsertBillDetailScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 400,
    backgroundColor: '#fff',
  },
});
