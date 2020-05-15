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
  ActivityIndicator
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import billsSlice, { billsSelector, totalBillsAmountSelector, selectedBillsSelector, isSuccessBillSelector } from '../features/bills/billsSlice'
import { invoiceSelector } from '../features/invoices/invoiceSlice'
import { fetchInvoice } from '../features/invoices/invoiceSaga'


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
    if (selectedBills.length >= 2) {
      if (amount <= 50000) {
        const allBillsFinishedLoading = bills.find((bill) => bill.loading === true)
        if (allBillsFinishedLoading == undefined) {
          dispatch(billsAction.payBills())
        } else {
          alert('Please wait until all bills finish getting the latest data.')
        }

      } else {
        alert('For now we only allow payment up to RM500.')
      }
    } else {
      alert('You need to pay a minimum of 2 bills.')
    }

  }

  useEffect(() => {
    if (userInfo.token != '') {
      dispatch(getBill())
    }


  }, [userInfo.token])

  return (
    <View style={{ minHeight: '80vh', backgroundColor: 'white', paddingHorizontal: 20, paddingTop: 10 }}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ flex: .9, fontSize: 14, fontWeight: 'bold', alignSelf: 'center', color: 'grey' }}>Bills</Text>
      </View>
      <View>
        {bills.length > 0 ? bills.map((bill) => {
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
    <View style={{ minHeight: '80vh', backgroundColor: 'white', paddingHorizontal: 20, paddingTop: 10 }}>
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
    <ScrollView className="scrollView" style={styles.container} contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>
      <View style={{ justifyContent: 'center', flexDirection: 'row', paddingVertical: 10, paddingLeft: 20, }}>
        <View style={{ flexGrow: 1, flexDirection: 'row' }}>
          <Image
            resizeMode='contain'
            style={{
              width: 35,
              height: 35
            }}
            source={require('../assets/images/icon.png')} />
          <Text style={{ color: '#ffff', fontWeight: 'bold', fontSize: 25, alignSelf: 'center', marginLeft: 10 }}>Bayaq</Text>
        </View>

        <TouchableOpacity style={{ flex: .5, paddingRight: 20, justifyContent: 'center' }} onPress={logoutPressed}>
          <Text style={{ textAlign: 'right', color: 'white' }}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingLeft: 5, flexDirection: 'row', paddingVertical: 10 }}>
        <View style={{ flex: .3, alignSelf: 'center' }}>
          <TouchableOpacity onPress={homePressed}>
            <Text style={[selectedTab === 'Home' ? selectedTabStyle : notSelectedTabStyle, { alignSelf: 'center', borderRadius: 10, paddingHorizontal: 20, paddingBottom: 3 }]}>Bills</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: .3, alignSelf: 'center' }}>
          <TouchableOpacity onPress={invoicePresssed}>
            <Text style={[selectedTab != 'Home' ? selectedTabStyle : notSelectedTabStyle, { alignSelf: 'center', borderRadius: 10, paddingHorizontal: 20, paddingBottom: 3 }]}>Invoice</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: .3 }}></View>
        <View style={{ flex: .3 }} >
          <TouchableOpacity style={{ paddingRight: 20 }} onPress={addBillPressed}>
            <Ionicons style={{ textAlign: 'right' }} name="ios-add" color={"white"} size={35} />
          </TouchableOpacity>
        </View>
      </View>

      {selectedTab === 'Home' ? <BillList navigation={navigation} /> : <InvoiceList navigation={navigation} />}


      <View style={{ paddingVertical: 30 }}>
        <Text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>
          Copyright &copy; 2020 Online Payment Solutions | Contact admin@bayaqapp.com<Text> </Text>
        </Text>
      </View>
    </ScrollView >
  );
}

HomeScreen.navigationOptions = {
  header: null,
};
HomeScreen.path = ''

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryColor,
  },
});
