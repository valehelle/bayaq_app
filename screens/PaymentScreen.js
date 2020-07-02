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
  ActivityIndicator
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import userSlice from '../features/accounts/userSlice'
import Colors from '../constants/Colors'
import { useNavigation, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import billsSlice, { paymentUrlSelector } from '../features/bills/billsSlice'
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';

const billsAction = billsSlice.actions

const userAction = userSlice.actions


const getReferrenceID = (url) => {
  const removeLeftArray = url.split("billplz%5Bid%5D=")
  const removeLeft = removeLeftArray[1]
  const removeRightArray = removeLeft.split("&billplz%5Bpaid%5D=")
  return removeRightArray[0]

}
export default function PaymentScreen() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const router = useRoute()
  const { bankCode } = router.params
  const paymentUrl = useSelector(state => paymentUrlSelector(state))
  useEffect(() => {
    dispatch(billsAction.getPaymentUrl({ bankCode: bankCode }))
  }, [])
  return (

    <View style={{ flex: 1, backgroundColor: Colors.headerColor }}>
      <View style={{ flex: .1, paddingTop: Constants.statusBarHeight, }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 20, paddingVertical: 10, flex: .2 }}>
            <Ionicons name="ios-arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={{ flex: .6, paddingHorizontal: 20, paddingVertical: 5 }}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 30, fontWeight: 'bold' }}>Payment</Text>
          </View>
          <View style={{ flex: .2, paddingHorizontal: 20, paddingVertical: 10 }}>


          </View>
        </View>
      </View>
      <View style={{ flex: .9 }}>
        <View style={{ height: '100%', backgroundColor: 'white' }}>
          {paymentUrl ?
            <WebView
              source={{ uri: paymentUrl }}
              onShouldStartLoadWithRequest={request => {

                if (request.url.startsWith('https://www.bayaqapp.com')) {
                  if (request.url.includes("paid%5D=true")) {
                    const referrenceID = getReferrenceID(request.url)
                    navigation.navigate("Home", { isPayment: true, paymentSuccess: true, referrenceID })
                  } else {
                    navigation.navigate("Home", { isPayment: true, paymentSuccess: false, referrenceID: '' })
                  }
                  return false
                }
                return true
              }} />
            :
            <View style={{ height: '100%', justifyContent: 'center', alignContent: 'center' }}>
              <ActivityIndicator size='large' color={Colors.secondaryColor} />
            </View>
          }
        </View>
      </View>
    </View >




  )
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 50,
    backgroundColor: Colors.primaryColor,
  },
});


