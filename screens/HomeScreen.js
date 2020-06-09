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
import * as Analytics from 'expo-firebase-analytics';
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
import { banks } from '../constants/Banks'
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

          if (userInfo.profile.bankCode == "" || userInfo.profile.bankCode == "0") {
            navigation.navigate('SelectBank', { proceedPayment: true })
          } else {
            navigation.navigate('Payment', { bankCode: userInfo.profile.bankCode })

          }
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

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 20, paddingTop: 90 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'grey' }}>Bills</Text>
        <View style={{ backgroundColor: '#f6f6f6', borderRadius: 20, marginBottom: 100, marginTop: 10 }}>
          {loading ?
            <View style={{ height: '90%', justifyContent: 'center' }}>
              <ActivityIndicator size={25} color={Colors.secondaryColor} style={{ paddingTop: 20, paddingBottom: 10 }} />
            </View>
            :
            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10 }}>
              {
                bills.length > 0 ? bills.map((bill) => {
                  return (
                    <TouchableOpacity style={{ paddingTop: 15, flexDirection: 'row' }} key={bill.id} onPress={() => !isBillLoading(bill.id) && billPressed(bill)} >
                      <View style={{ flex: .2 }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => isBillSelected(bill.id) ? dispatch(billsAction.removeSelectedBills({ bill })) : dispatch(billsAction.setSelectedBills({ bill }))}>
                          {isBillLoading(bill.id) ? <ActivityIndicator size={31} color={Colors.secondaryColor} /> : isBillSelected(bill.id) ? <Ionicons style={{}} name="ios-checkmark-circle" color={isBillSelected(bill.id) ? Colors.secondaryColor : "lightgrey"} size={31} /> : <Ionicons style={{}} name="ios-checkmark-circle-outline" color={isBillSelected(bill.id) ? Colors.secondaryColor : "lightgrey"} size={31} />}
                        </TouchableOpacity>
                      </View>
                      <View style={{ flex: .3, flexGrow: 1, paddingLeft: 5 }}>

                        <Text style={{ fontSize: 14, fontWeight: '600', color: isBillSelected(bill.id) ? 'black' : "lightgrey" }}>{bill.companyName}</Text>
                        <Text style={{ fontSize: 14, color: isBillSelected(bill.id) ? 'black' : "lightgrey" }}>{bill.ref1}{bill.ref2 != null && ` (${bill.ref2})`}</Text>

                      </View>

                      <View style={{ flex: .5 }}>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                          <Text style={{ flex: .3, fontSize: 14, fontWeight: 'bold', textAlign: 'center', color: isBillSelected(bill.id) ? 'black' : "lightgrey" }}>RM</Text>
                          <Text style={{ flex: .7, marginRight: 8, fontSize: 14, fontWeight: 'bold', textAlign: 'right', color: isBillSelected(bill.id) ? 'black' : "lightgrey" }}>{toFormatSafe(Dinero({ amount: bill.amount }))}</Text>

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
              <View style={{ height: 30 }} />
            </ScrollView>
          }
        </View>

        <View style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'white', paddingBottom: 10 }}>
          <Text style={{ fontSize: 12, color: 'grey', textAlign: 'right' }}>Service Fee RM {toFormatSafe(Dinero({ amount: selectedBills.length * 50 }))}</Text>
          <Text style={{ fontWeight: '600', fontSize: 20, textAlign: 'right' }}>Total RM {toFormatSafe(Dinero({ amount: amount + (selectedBills.length * 50) }))}</Text>
          <TouchableOpacity onPress={payBillsPressed} style={{ paddingHorizontal: 10, backgroundColor: Colors.secondaryColor, borderRadius: 5, paddingVertical: 10, marginTop: 5 }}>
            <Text style={{ color: 'white', fontWeight: '600', textAlign: 'center', fontSize: 20 }}>Pay Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View >
  )
}


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const shortName = (name) => {
  const firstName = name.split(" ")[0]
  if (firstName != "") {
    return `Hello ${capitalizeFirstLetter(firstName)}`
  } else {
    return ""
  }

}
export default function HomeScreen() {
  const dispatch = useDispatch()
  const [selectedTab, setSelectedTab] = useState('Home')
  const userInfo = useSelector(state => userInfoSelector(state))

  const isSuccess = useSelector(state => isSuccessBillSelector(state))
  const navigation = useNavigation();

  const addBillPressed = ({ bills, title, image }) => {
    navigation.navigate('SelectBill', { bills, title, image })
  }

  useEffect(() => {
    Analytics.setCurrentScreen("Home")
    dispatch(getUserInfo())
    isSuccess && setSelectedTab('Invoice')

  }, [])

  const bank = banks.find((bank) => bank.code == userInfo.profile.bankCode)

  return (
    <View style={{ flex: 1, backgroundColor: Colors.headerColor }}>
      <View style={{ flex: .4, paddingTop: Constants.statusBarHeight, backgroundColor: Colors.headerColor }}>
        <TouchableOpacity onPress={() => navigation.navigate("SelectBank", { proceedPayment: false })} style={{ alignSelf: 'flex-end', paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'row' }}>
          {bank && <View style={{ justifyContent: 'center', alignContent: 'center', borderRightWidth: 1, borderRightColor: 'white', paddingRight: 10, marginRight: 10, height: 18, marginTop: 3 }}><Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>{bank.name}</Text></View>}
          <AntDesign name="creditcard" size={24} color="white" />
        </TouchableOpacity>
        <View style={{ height: '100%', justifyContent: 'center' }}>
          <Text style={{ marginBottom: 120, width: '100%', color: 'white', fontSize: 40, fontWeight: 'bold', textAlign: 'center' }}>{shortName(userInfo.profile.name)}</Text>
        </View>
      </View>
      <View style={{ flex: .8, backgroundColor: 'white' }}>
        <BillList />
        <View style={{ position: 'absolute', top: -75, height: 150 }}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ height: '100%' }} contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 10 }}>
            <BillCard first onPress={() => addBillPressed({ bills: electricity, title: 'Electricity', image: require('../assets/images/electricity.png') })} icon={<SimpleLineIcons name="energy" size={40} color="white" style={{ alignSelf: 'center' }} />} title="Electricity" />
            <BillCard onPress={() => addBillPressed({ bills: water, title: 'Water', image: require('../assets/images/water.png') })} icon={<Feather name="droplet" size={40} color="white" style={{ alignSelf: 'center' }} />} title="Water" />
            <BillCard onPress={() => addBillPressed({ bills: telco, title: 'Telco', image: require('../assets/images/telco.png') })} icon={<Feather name="phone" size={40} color="white" style={{ alignSelf: 'center' }} />} title="Telco" />
            <BillCard last onPress={() => addBillPressed({ bills: other, title: 'Other', image: require('../assets/images/others.png') })} icon={<Feather name="wifi" size={40} color="white" style={{ alignSelf: 'center' }} />} title="Others" />
          </ScrollView>
        </View>
      </View>
    </View >
  );
}

const BillCard = ({ first, last, icon, title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 10, width: screenWidth / 3.2 }}>
      <View style={{ backgroundColor: Colors.secondaryColor, borderRadius: 10, height: '100%', justifyContent: 'center' }}>
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
