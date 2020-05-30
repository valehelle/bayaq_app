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

import { getBill, getBillAmount } from '../features/bills/billsSaga'
import { getUserInfo } from '../features/accounts/userSaga'
const billsAction = billsSlice.actions
const userAction = userSlice.actions
import Dinero from 'dinero.js'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import Colors from '../constants/Colors'
var moment = require('moment');
const screenWidth = Math.round(Dimensions.get('window').width);

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
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 20, paddingTop: 10 }}>
      <View style={{ flex: .8 }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'grey' }}>Bills</Text>
        <ScrollView>
          {loading ?

            <ActivityIndicator size={25} color={Colors.secondaryColor} style={{ paddingTop: 20, paddingBottom: 10 }} />
            :
            bills.length > 0 ? bills.map((bill) => {
              return (
                <TouchableOpacity style={{ paddingTop: 15, flexDirection: 'row' }} key={bill.id} onPress={() => !isBillLoading(bill.id) && billPressed(bill)} >
                  <View style={{}}>
                    {isBillLoading(bill.id) ? <ActivityIndicator size={25} color={Colors.secondaryColor} style={{ paddingTop: 5 }} /> : <Ionicons style={{}} name="ios-checkmark-circle" color={isBillSelected(bill.id) ? Colors.secondaryColor : "lightgrey"} size={31} />}
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
        </ScrollView>
      </View>
      <View style={{ flex: .4, marginTop: 20, marginBottom: 10 }}>
        <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
          <Text style={{ fontSize: 12, color: 'grey' }}>Service Fee RM {Dinero({ amount: selectedBills.length * 50 }).toFormat("0.00")}</Text>
          <Text style={{ fontWeight: '600', fontSize: 20 }}>Total RM {Dinero({ amount: amount + (selectedBills.length * 50) }).toFormat("0.00")}</Text>
          <TouchableOpacity onPress={payBillsPressed} style={{ paddingHorizontal: 10, backgroundColor: Colors.secondaryColor, borderRadius: 5, paddingVertical: 10, marginTop: 5 }}>
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
    <View style={{ flex: 1, backgroundColor: Colors.headerColor }}>
      <View style={{ flex: .5, paddingTop: Constants.statusBarHeight, backgroundColor: Colors.headerColor }}>
        <View style={{ flex: .5 }}>
          <TouchableOpacity style={{ alignSelf: 'flex-end', paddingHorizontal: 20, paddingVertical: 10 }}>
            <AntDesign name="creditcard" size={24} color="white" />
          </TouchableOpacity>
          <Text style={{ position: 'absolute', bottom: 0, width: '100%', color: 'white', fontSize: 40, fontWeight: 'bold', textAlign: 'center' }}> Hello Zimi</Text>

        </View>
        <View style={{ flex: .7, }}>
          <View style={{ flex: .5, backgroundColor: Colors.primaryColor }}>

          </View>
          <View style={{ flex: .5, backgroundColor: 'white' }}>

          </View>
          <View style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <View style={{ flexDirection: 'row' }}>
              <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ width: '100%' }}>
                <BillCard onPress={() => console.log('ddd')} icon={<SimpleLineIcons name="energy" size={40} color="white" style={{ alignSelf: 'center' }} />} title="Electricity" />
                <BillCard onPress={() => console.log('ddd')} icon={<Feather name="droplet" size={40} color="white" style={{ alignSelf: 'center' }} />} title="Water" />
                <BillCard onPress={() => console.log('ddd')} icon={<Feather name="phone" size={40} color="white" style={{ alignSelf: 'center' }} />} title="Telco" />
                <BillCard onPress={() => console.log('ddd')} icon={<Feather name="wifi" size={40} color="white" style={{ alignSelf: 'center' }} />} title="Internet" />
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flex: .8, backgroundColor: 'white' }}>
        <BillList />
      </View>
    </View >
  );
}

const BillCard = ({ icon, title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 15, width: screenWidth / 2.5 }}>
      <View style={{ backgroundColor: Colors.secondaryColor, borderRadius: 5, paddingVertical: '10%' }}>
        <View style={{ height: 40 }}>
          {icon}
        </View>
        <Text style={{ color: 'white', fontSize: 15, textAlign: 'center', marginTop: 10 }}>{title}</Text>
        <MaterialIcons name="add" size={20} color="white" style={{ alignSelf: 'center', }} />
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
