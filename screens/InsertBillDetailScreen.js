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
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';

import { useDispatch } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native';
import Colors from '../constants/Colors'
export default function InsertBillDetailScreen() {
  const dispatch = useDispatch()
  const route = useRoute();
  const navigation = useNavigation()
  const [bill, setBill] = useState({
    ref1: '',
    ref2: '',
    billerCode: '',
    amount: '0.00',
  })
  useEffect(() => {
    const billDetail = route.params.bill
    if (typeof billDetail === 'string' || billDetail instanceof String) {

      navigation.navigate('Home')
    } else {
      setBill({ ...bill, billerCode: billDetail.billerCode, companyName: billDetail.companyName, type: billDetail.type })
    }
  }, [])

  const createBillPressed = () => {
    if (bill.ref1 != '' || bill.ref2 != '') {
      navigation.navigate('AddAmount', { bill, billStatus: 'CREATE' })
    } else {
      alert('Please enter all the required information.')
    }
  }
  return (

    <View style={{ flex: 1, backgroundColor: Colors.headerColor }}>
      <View style={{ flex: .4, paddingTop: Constants.statusBarHeight, }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={{ height: '100%', justifyContent: 'center' }}>
            <Text style={{ marginBottom: 70, width: '100%', height: 100, color: 'white', fontSize: 40, fontWeight: 'bold', textAlign: 'center' }}>{bill.companyName}</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: .6, backgroundColor: 'white', flexDirection: 'row', flexWrap: 'wrap' }}>
        <Text>{bill.billerCode === '40386' && 'Contract '}Account Number</Text>
        <TextInput
          maxLength={40}
          onChangeText={(text) => setBill({ ...bill, ref1: text })}
          value={bill.ref1}
          keyboardType='phone-pad'
          placeholder='12948847628383'
          style={{ marginTop: 10, borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }}
        />
        {bill.type == 'TELCO' && (
          <View style={{ marginTop: 20 }}>
            <Text>Phone Number:</Text>
            <TextInput
              maxLength={40}
              value={bill.ref2}
              keyboardType='phone-pad'
              placeholder='0173566778'
              onChangeText={(text) => setBill({ ...bill, ref2: text })}
              style={{ marginTop: 10, borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }}
            />
          </View>
        )}
        {bill.type == 'PERLIS' && (
          <View style={{ marginTop: 20 }}>
            <Text>Bill Number:</Text>
            <TextInput
              maxLength={40}
              value={bill.ref2}
              keyboardType='phone-pad'
              placeholder='231422'
              onChangeText={(text) => setBill({ ...bill, ref2: text })}
              style={{ marginTop: 10, borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }}
            />
          </View>
        )}
        {bill.billerCode === '40386' && (
          <View style={{ marginTop: 20 }}>
            <Text>Contract Account Name:</Text>
            <TextInput
              maxLength={40}
              value={bill.ref2}
              placeholder='Siti Noor Aminah'
              onChangeText={(text) => setBill({ ...bill, ref2: text })}
              style={{ marginTop: 10, borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }}
            />
          </View>
        )}
        {bill.billerCode === '37234' && (
          <View style={{ marginTop: 20 }}>
            <Text>Bill Code No:</Text>
            <TextInput
              maxLength={40}
              value={bill.ref2}
              placeholder='Starts with 01xxxx, 6 digit number.'
              onChangeText={(text) => setBill({ ...bill, ref2: text })}
              style={{ marginTop: 10, borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }}
            />
          </View>
        )}
        <TouchableOpacity onPress={createBillPressed}><Text>Next</Text></TouchableOpacity>
      </View>
    </View >

  );
}
InsertBillDetailScreen.navigationOptions = {
  header: null,
};
InsertBillDetailScreen.path = 'insert_bill'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
  },
});
