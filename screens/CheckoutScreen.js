import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import Colors from '../constants/Colors'
import { useSelector, useDispatch } from 'react-redux'
import userSlice, { userInfoSelector } from '../features/accounts/userSlice'
import { totalBillsAmountSelector, selectedBillsSelector } from '../features/bills/billsSlice'
import { banks } from '../constants/Banks'

import Dinero from 'dinero.js'
var moment = require('moment');
import { Ionicons } from '@expo/vector-icons'

import Constants from 'expo-constants';

import { useNavigation, useRoute } from '@react-navigation/native';

const toFormatSafe = (d) => {
  const [units, subunits] = d
    .toRoundedUnit(2)
    .toString()
    .split(".");
  const stringified = subunits
    ? [units, subunits.padEnd(2, "0")].join(".")
    : [units, "00"].join(".");

  return `${stringified}`;
}


export default function CheckoutScreen() {
  const navigation = useNavigation()
  const router = useRoute()
  const userInfo = useSelector(state => userInfoSelector(state))

  const bank = (userInfo.profile.bankCode != '' && userInfo.profile.bankCode != "0") ? banks.find((bank) => bank.code == userInfo.profile.bankCode) : { name: 'Select Bank' }

  const amount = useSelector(state => totalBillsAmountSelector(state))
  const selectedBills = useSelector(state => selectedBillsSelector(state))
  const payButtonPressed = () => {
    if (userInfo.profile.bankCode == "" || userInfo.profile.bankCode == "0") {
      Alert.alert(
        'Payment',
        'Please select your preferred bank for FPX payment',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Select Bank', onPress: () => {
              navigation.navigate("SelectBank", { proceedPayment: false })
            }
          },
        ],
        { cancelable: false }
      );
    } else {
      navigation.navigate('Payment', { bankCode: userInfo.profile.bankCode })
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: Colors.headerColor }}>
      <View style={{ flex: .4, paddingTop: Constants.statusBarHeight, }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
            <Ionicons name="ios-arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={{ height: '100%' }}>
            <Text style={{ marginTop: 30, width: '100%', color: 'white', fontSize: 40, fontWeight: 'bold', textAlign: 'center' }}>Checkout</Text>

          </View>
        </View>
      </View>
      <View style={{ flex: .8, backgroundColor: 'white' }}>
        <ScrollView style={{ paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View style={{ flex: .5 }}>
              <Text style={{ fontWeight: 'bold', }}>Payment Gateway</Text>
              <Text style={{ marginTop: 5, color: '#3784f4', fontWeight: 'bold', fontSize: 20 }}>Billplz</Text>
            </View>
            <View style={{ flex: .5 }}>
              <TouchableOpacity onPress={() => navigation.navigate("SelectBank", { proceedPayment: false })}>
                <Text style={{ fontWeight: 'bold', textAlign: 'right' }}>Bank</Text>
                <Text style={{ textAlign: 'right', marginTop: 5, fontWeight: 'bold', fontSize: 20 }}>{bank.name}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>Bills</Text>
          {selectedBills.map(bill => {
            return (
              <View style={{ marginTop: 10, flexDirection: 'row' }} key={bill.id}  >
                <View style={{ flex: .5, flexGrow: 1 }}>

                  <Text style={{ fontSize: 14, fontWeight: '600', }}>{bill.companyName}</Text>
                  <Text style={{ fontSize: 14 }}>{bill.ref1}{bill.ref2 != null && ` (${bill.ref2})`}</Text>

                </View>

                <View style={{ flex: .5 }}>
                  <Text style={{ marginRight: 8, fontSize: 14, fontWeight: 'bold', textAlign: 'right' }}>RM {toFormatSafe(Dinero({ amount: bill.amount }))}</Text>

                </View>
              </View>
            )
          })}
          {selectedBills.length === 1 &&
            <TouchableOpacity onPress={() => navigation.goBack()}><Text style={{ color: Colors.secondaryColor, marginTop: 15, fontWeight: 'bold', fontSize: 16 }}>Add more bills</Text></TouchableOpacity>
          }

          <View style={{ marginTop: 15, flexDirection: 'row', borderTopWidth: 1, borderTopColor: 'grey', paddingTop: 10 }}  >
            <View style={{ flex: .5, flexGrow: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', }}>Sub Total</Text>
            </View>
            <View style={{ flex: .5 }}>
              <Text style={{ marginRight: 8, fontSize: 14, fontWeight: 'bold', textAlign: 'right' }}>RM {toFormatSafe(Dinero({ amount: amount }))}</Text>
            </View>
          </View>
          <View style={{ marginTop: 5, flexDirection: 'row' }}  >
            <View style={{ flex: .5, flexGrow: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', }}>Service Fee</Text>
            </View>
            <View style={{ flex: .5 }}>
              <Text style={{ marginRight: 8, fontSize: 14, fontWeight: 'bold', textAlign: 'right' }}>RM {toFormatSafe(Dinero({ amount: selectedBills.length * 99 }))}</Text>
            </View>
          </View>
          <View style={{ marginTop: 15, flexDirection: 'row', borderTopWidth: 1, borderTopColor: 'grey', paddingTop: 10 }}  >
            <View style={{ flex: .5, flexGrow: 1 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Total Amount</Text>
            </View>
            <View style={{ flex: .5 }}>
              <Text style={{ marginRight: 8, fontSize: 20, fontWeight: 'bold', textAlign: 'right' }}>RM {toFormatSafe(Dinero({ amount: amount + (selectedBills.length * 99) }))}</Text>
            </View>
          </View>
          <View style={{ height: 100 }}>

          </View>
        </ScrollView>
        <View style={{ flex: .2 }}>
          <View style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'white', paddingBottom: 5, paddingHorizontal: 20 }}>
            <TouchableOpacity style={{ backgroundColor: Colors.secondaryColor, borderRadius: 10, paddingVertical: 10 }} onPress={payButtonPressed}>
              <Text style={{ fontSize: 20, fontWeight: '600', textAlign: 'center', color: "white" }}>PAY RM {toFormatSafe(Dinero({ amount: amount + (selectedBills.length * 99) }))}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View >
  );
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 50,
    backgroundColor: Colors.primaryColor,
  },
});


