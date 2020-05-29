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
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import billsSlice, { isBillLoadingSelector, billsSelector, totalBillsAmountSelector, selectedBillsSelector, isSuccessBillSelector } from '../features/bills/billsSlice'
import { invoiceSelector } from '../features/invoices/invoiceSlice'
import { fetchInvoice } from '../features/invoices/invoiceSaga'
import Constants from 'expo-constants';


import userSlice, { userInfoSelector } from '../features/accounts/userSlice'

import { getBill, getBillAmount } from '../features/bills/billsSaga'
import { getUserInfo } from '../features/accounts/userSaga'
const billsAction = billsSlice.actions
const userAction = userSlice.actions
import Dinero from 'dinero.js'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import Colors from '../constants/Colors'
var moment = require('moment');


const BillList = ({ navigation }) => {
  const dispatch = useDispatch()
  const bills = useSelector(state => billsSelector(state))
  const userInfo = useSelector(state => userInfoSelector(state))
  const amount = useSelector(state => totalBillsAmountSelector(state))
  const selectedBills = useSelector(state => selectedBillsSelector(state))
  const loading = useSelector(state => isBillLoadingSelector(state))

  const isBillSelected = (id) => {
    return selectedBills.filter((bill) => bill.id == id).length > 0 ? true : false
  }

  const isBillLoading = (id) => {
    return bills.find((bill) => bill.id == id).loading
  }

  const billPressed = (bill) => {
    const newBill = { ...bill, amount: Dinero({ amount: bill.amount }).toFormat("0.00") }
    navigation.navigate('AddAmount', { bill: newBill, billStatus: 'UPDATE' })
  }
  const payBillsPressed = () => {
    if (selectedBills.length >= 1) {
      if (amount <= 50000) {
        const allBillsFinishedLoading = bills.find((bill) => bill.loading === true)
        if (allBillsFinishedLoading == undefined) {
          navigation.navigate('SelectBank')
        } else {
          alert('Please wait until all bills finish getting the latest data.')
        }

      } else {
        alert('For now we only allow payment up to RM500.')
      }
    } else {
      alert('You need to pay a minimum of 1 bills.')
    }

  }

  useEffect(() => {
    if (userInfo.token != '') {
      dispatch(billsAction.getBill())
    }


  }, [userInfo.token])

  return (
    <View style={{ minHeight: 80, backgroundColor: 'white', paddingHorizontal: 20, paddingTop: 10 }}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ flex: .9, fontSize: 14, fontWeight: 'bold', alignSelf: 'center', color: 'grey' }}>Bills</Text>
      </View>
      <View>
        {loading ?

          <ActivityIndicator size={25} color={Colors.primaryColor} style={{ paddingTop: 20, paddingBottom: 10 }} />
          :
          bills.length > 0 ? bills.map((bill) => {
            return (
              <TouchableOpacity style={{ paddingTop: 15, flexDirection: 'row' }} key={bill.id} onPress={() => !isBillLoading(bill.id) && billPressed(bill)} >
                <View style={{}}>
                  {isBillLoading(bill.id) ? <ActivityIndicator size={25} color={Colors.primaryColor} style={{ paddingTop: 5 }} /> : <Ionicons style={{}} name="ios-checkmark-circle" color={isBillSelected(bill.id) ? Colors.primaryColor : "lightgrey"} size={31} />}
                </View>
                <View style={{ marginLeft: 15, flexGrow: 1, paddingLeft: 5 }}>
                  <Text style={{ fontSize: 14, fontWeight: '600' }}>{bill.companyName}</Text>
                  <Text style={{ fontSize: 14 }}>{bill.ref1}{bill.ref2 != null && ` (${bill.ref2})`}</Text>
                  <Text style={{ fontSize: 12 }}>RM{Dinero({ amount: bill.amount }).toFormat("0.00")}</Text>

                </View>
              </TouchableOpacity>
            )
          })
            : <View style={{ paddingVertical: 10 }}>
              <Text style={{ fontSize: 14 }}>You don't have any bills yet.</Text>
              <Text style={{ fontSize: 14, marginTop: 10 }}>Click <Text style={{ fontWeight: 'bold' }}>+</Text> button to add your bill.</Text>
            </View>
        }
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Text style={{ fontSize: 12, color: 'grey' }}>Service Fee RM {Dinero({ amount: selectedBills.length * 50 }).toFormat("0.00")}</Text>
          <Text style={{ fontWeight: '600', fontSize: 20 }}>Total RM {Dinero({ amount: amount + (selectedBills.length * 50) }).toFormat("0.00")}</Text>
          <TouchableOpacity onPress={payBillsPressed} style={{ paddingHorizontal: 10, backgroundColor: Colors.primaryColor, borderRadius: 5, paddingVertical: 10, marginTop: 5 }}>
            <Text style={{ color: 'white', fontWeight: '600', textAlign: 'center' }}>Pay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const InvoiceList = ({ navigation }) => {
  const dispatch = useDispatch()
  const userInfo = useSelector(state => userInfoSelector(state))
  const invoices = useSelector(state => invoiceSelector(state))

  useEffect(() => {
    if (userInfo.token != '') {
      dispatch(fetchInvoice())
    }


  }, [userInfo.token])
  return (
    <View style={{ minHeight: 80, backgroundColor: 'white', paddingHorizontal: 20, paddingTop: 10 }}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ flex: .9, fontSize: 14, fontWeight: 'bold', alignSelf: 'center', color: 'grey' }}>Invoices</Text>
      </View>
      <View style={{ paddingBottom: 10 }}>
        {invoices.length > 0 && invoices.map((invoice) => {
          return (
            <View key={invoice.ref_id} style={{ flexGrow: 1, marginTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
              <Text style={{ fontSize: 14, fontWeight: '600' }}>Reference ID: {invoice.ref_id}</Text>
              <Text style={{ fontSize: 14, fontWeight: '600' }}>Paid At: {moment.utc(invoice.paid_at).local().format('LLLL')}</Text>
              <Text style={{ fontSize: 14, fontWeight: '600' }}>Amount: RM {Dinero({ amount: invoice.amount }).toFormat("0.00")}</Text>

              {invoice.bills.map((bill) => {
                return (
                  <View key={bill.id} style={{ paddingLeft: 10, marginTop: 5 }}>
                    <Text style={{ fontSize: 14, fontWeight: '600' }}>{bill.company_name}</Text>
                    <Text style={{ fontSize: 14 }}>{bill.ref1}{bill.ref2 != null && ` (${bill.ref2})`}</Text>
                    <Text style={{ fontSize: 12 }}>RM{Dinero({ amount: bill.amount }).toFormat("0.00")}</Text>
                  </View>
                )
              })}
            </View>
          )
        })
        }
      </View>
    </View>
  )
}


export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch()
  const [selectedTab, setSelectedTab] = useState('Home')
  const isSuccess = useSelector(state => isSuccessBillSelector(state))
  const addBillPressed = () => {
    navigation.navigate('SelectBill')
  }

  useEffect(() => {
    dispatch(getUserInfo())
    isSuccess && setSelectedTab('Invoice')

  }, [])

  const invoicePresssed = () => {
    setSelectedTab('Invoice')
  }
  const homePressed = () => {
    setSelectedTab('Home')
  }

  const logoutPressed = () => {
    dispatch(userAction.userLogout())
    navigation.navigate('Landing')
  }

  const selectedTabStyle = {
    backgroundColor: 'rgba(255,255,255,0.5)'
  }
  const notSelectedTabStyle = {
    color: 'white'
  }


  return (
    <View>
      <View style={{ minHeight: '20%', paddingTop: Constants.statusBarHeight, backgroundColor: Colors.headerColor }}>
        <Text style={{ paddingTop: 20 }}></Text>
        <Text style={{ marginTop: 50, color: 'white', fontSize: 40, fontWeight: 'bold', textAlign: 'center' }}> Hello Zimi</Text>
        <View>
          <View style={{ height: 100, backgroundColor: Colors.primaryColor }}>

          </View>
          <View style={{ height: 100, backgroundColor: 'white' }}>

          </View>
          <View style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <View style={{ flexDirection: 'row', height: 120 }}>
              <View style={{ paddingHorizontal: 10, width: '30%' }}>
                <View style={{ height: '100%', backgroundColor: 'blue', borderRadius: 5, }}>
                  <View style={{ height: 50 }}></View>
                  <Text style={{ color: 'white', fontSize: 15, textAlign: 'center' }}>Electricity</Text>
                  <Text style={{ color: 'white', fontSize: 40, textAlign: 'center', fontWeight: 'bold' }}>+</Text>
                </View>
              </View>

            </View>
          </View>
        </View>
      </View>
      <View style={{ height: '100%', backgroundColor: 'white' }}>

      </View>
    </View >
  );
}

HomeScreen.navigationOptions = {
  header: null,
};
HomeScreen.path = ''

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.headerColor,
  },
});
