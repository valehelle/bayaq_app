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
import { Dimensions } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import userSlice, { userInfoSelector } from '../features/accounts/userSlice'
import { useNavigation } from '@react-navigation/native';
import { getBill, getBillAmount } from '../features/bills/billsSaga'
import { getUserInfo } from '../features/accounts/userSaga'
const billsAction = billsSlice.actions
const userAction = userSlice.actions
import Dinero from 'dinero.js'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import Colors from '../constants/Colors'
var moment = require('moment');
const screenWidth = Math.round(Dimensions.get('window').width);

import { electricity, water, telco, other } from '../constants/Bills'

const BillList = () => {
  const dispatch = useDispatch()
  const bills = useSelector(state => billsSelector(state))
  const userInfo = useSelector(state => userInfoSelector(state))
  const amount = useSelector(state => totalBillsAmountSelector(state))
  const selectedBills = useSelector(state => selectedBillsSelector(state))
  const loading = useSelector(state => isBillLoadingSelector(state))
  const navigation = useNavigation();
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
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10, paddingTop: 80 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'grey' }}>Bills</Text>
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#f6f6f6', borderRadius: 5, marginBottom: 100, paddingHorizontal: 10 }}>
          {loading ?

            <ActivityIndicator size={25} color={Colors.secondaryColor} style={{ paddingTop: 20, paddingBottom: 10 }} />
            :
            bills.length > 0 ? bills.map((bill) => {
              return (
                <TouchableOpacity style={{ paddingTop: 15, flexDirection: 'row' }} key={bill.id} onPress={() => !isBillLoading(bill.id) && billPressed(bill)} >
                  <View style={{ flex: .2 }}>
                    {isBillLoading(bill.id) ? <ActivityIndicator size={25} color={Colors.secondaryColor} style={{ paddingTop: 5 }} /> : <Ionicons style={{}} name="ios-checkmark-circle" color={isBillSelected(bill.id) ? Colors.secondaryColor : "lightgrey"} size={31} />}
                  </View>
                  <View style={{ flex: .4, flexGrow: 1, paddingLeft: 5 }}>

                    <Text style={{ fontSize: 14, fontWeight: '600' }}>{bill.companyName}</Text>
                    <Text style={{ fontSize: 14 }}>{bill.ref1}{bill.ref2 != null && ` (${bill.ref2})`}</Text>

                  </View>

                  <View style={{ flex: .4 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ flex: .4, fontSize: 14, fontWeight: 'bold', width: '100%', textAlign: 'center' }}>RM</Text>
                      <Text style={{ flex: .6, fontSize: 14, fontWeight: 'bold', textAlign: 'right', width: '100%' }}>2{Dinero({ amount: bill.amount }).toFormat("0.00")}</Text>

                    </View>

                  </View>
                </TouchableOpacity>
              )
            })
              : <View style={{ paddingVertical: 10 }}>
                <Text style={{ fontSize: 14 }}>You don't have any bills yet.</Text>
                <Text style={{ fontSize: 14, marginTop: 10 }}>Click <Text style={{ fontWeight: 'bold' }}>+</Text> button to add your bill.</Text>
              </View>
          }
          <View style={{ height: 20 }} />
        </ScrollView>
        <View style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'white', paddingBottom: 10 }}>
          <Text style={{ fontSize: 12, color: 'grey', textAlign: 'right' }}>Service Fee RM {Dinero({ amount: selectedBills.length * 50 }).toFormat("0.00")}</Text>
          <Text style={{ fontWeight: '600', fontSize: 20, textAlign: 'right' }}>Total RM {Dinero({ amount: amount + (selectedBills.length * 50) }).toFormat("0.00")}</Text>
          <TouchableOpacity onPress={payBillsPressed} style={{ paddingHorizontal: 10, backgroundColor: Colors.secondaryColor, borderRadius: 5, paddingVertical: 10, marginTop: 5 }}>
            <Text style={{ color: 'white', fontWeight: '600', textAlign: 'center' }}>Pay Now</Text>
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


export default function HomeScreen() {
  const dispatch = useDispatch()
  const [selectedTab, setSelectedTab] = useState('Home')
  const isSuccess = useSelector(state => isSuccessBillSelector(state))
  const navigation = useNavigation();

  const addBillPressed = ({ bills, title }) => {
    navigation.navigate('SelectBill', { bills, title })
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
    <View style={{ flex: 1, backgroundColor: Colors.headerColor }}>
      <View style={{ flex: .4, paddingTop: Constants.statusBarHeight, backgroundColor: Colors.headerColor }}>
        <TouchableOpacity onPress={logoutPressed} style={{ alignSelf: 'flex-end', paddingHorizontal: 10, paddingVertical: 10 }}>
          <AntDesign name="creditcard" size={24} color="white" />
        </TouchableOpacity>
        <View style={{ height: '100%', justifyContent: 'center' }}>
          <Text style={{ marginBottom: 120, width: '100%', color: 'white', fontSize: 40, fontWeight: 'bold', textAlign: 'center' }}> Hello Zimi</Text>
        </View>
      </View>
      <View style={{ flex: .6, backgroundColor: 'white' }}>
        <BillList />
        <View style={{ position: 'absolute', top: -75, height: 150 }}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ height: '100%' }} contentContainerStyle={{ alignItems: 'center' }}>
            <BillCard onPress={() => addBillPressed({ bills: electricity, title: 'Electricity' })} icon={<SimpleLineIcons name="energy" size={40} color="white" style={{ alignSelf: 'center' }} />} title="Electricity" />
            <BillCard onPress={() => addBillPressed({ bills: water, title: 'Water' })} icon={<Feather name="droplet" size={40} color="white" style={{ alignSelf: 'center' }} />} title="Water" />
            <BillCard onPress={() => addBillPressed({ bills: telco, title: 'Telco' })} icon={<Feather name="phone" size={40} color="white" style={{ alignSelf: 'center' }} />} title="Telco" />
            <BillCard onPress={() => addBillPressed({ bills: other, title: 'Other' })} icon={<Feather name="wifi" size={40} color="white" style={{ alignSelf: 'center' }} />} title="Others" />
          </ScrollView>
        </View>
      </View>
    </View >
  );
}

const BillCard = ({ icon, title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 10, width: screenWidth / 3.2 }}>
      <View style={{ backgroundColor: Colors.secondaryColor, borderRadius: 5, height: '100%', justifyContent: 'center' }}>
        <View style={{ height: 40 }}>
          {icon}
        </View>
        <Text style={{ color: 'white', fontSize: 15, textAlign: 'center', marginTop: 10 }}>{title}</Text>
        <MaterialIcons name="add" size={30} color="white" style={{ alignSelf: 'center', marginTop: 10 }} />
      </View>
    </TouchableOpacity>
  )
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
