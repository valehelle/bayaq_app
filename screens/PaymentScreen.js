import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import userSlice from '../features/accounts/userSlice'
import Colors from '../constants/Colors'
import { useNavigation, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import billsSlice, { paymentUrlSelector } from '../features/bills/billsSlice'
import { ActivityIndicator } from 'react-native-paper';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';


const billsAction = billsSlice.actions

const userAction = userSlice.actions

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
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: .9 }}>
        <View style={{ height: '100%' }}>
          {paymentUrl ?
            <WebView
              source={{ uri: paymentUrl }}
              onShouldStartLoadWithRequest={request => {
                if (request.url.startsWith('https://www.bayaqapp.com/payment_status')) {
                  if (request.url.includes("paid%5D=true")) {
                    alert('success')
                  } else {
                    alert('fails')
                  }
                  navigation.navigate("Home")
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


