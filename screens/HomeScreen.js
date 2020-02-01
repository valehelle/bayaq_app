import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import billsSlice, { billsSelector, totalBillsAmountSelector, selectedBillsSelector } from '../features/bills/billsSlice'
import { getBill, getBillAmount } from '../features/bills/billsSaga'
import { getUserInfo } from '../features/accounts/userSaga'
const billsAction = billsSlice.actions
import Dinero from 'dinero.js'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../constants/Colors'

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch()
  const bills = useSelector(state => billsSelector(state))
  const amount = useSelector(state => totalBillsAmountSelector(state))

  const selectedBills = useSelector(state => selectedBillsSelector(state))


  const isBillSelected = (id) => {
    return selectedBills.filter((bill) => bill.id == id).length > 0 ? true : false
  }
  const addBillPressed = () => {
    navigation.navigate('SelectBill')
  }
  const billPressed = (bill) => {
    const newBill = { ...bill, amount: Dinero({ amount: bill.amount }).toFormat("0.00") }
    navigation.navigate('AddAmount', { bill: newBill, billStatus: 'UPDATE' })
  }
  const payBillsPressed = () => {
    if (selectedBills.length >= 2) {
      if (amount <= 50000) {
        dispatch(billsAction.payBills())
      } else {
        alert('For now we only allow payment up to RM500.')
      }
    } else {
      alert('You need to pay a minimum of 2 bills.')
    }

  }
  useEffect(() => {

    dispatch(getBill())
    dispatch(getUserInfo())
    dispatch(getBillAmount())
    const script = document.createElement('script');

    script.src = "https://js.stripe.com/v3/";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }

  }, [])
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>
      <View style={{ justifyContent: 'center', flexDirection: 'row', paddingVertical: 10, paddingLeft: 20, }}>
        <Text style={{ flexGrow: 1, color: '#ffff', fontWeight: 'bold', fontSize: 25, alignSelf: 'center' }}>Bayaq</Text>
        <TouchableOpacity style={{ flex: .3, paddingRight: 20 }} onPress={addBillPressed}>
          <Ionicons style={{ textAlign: 'right' }} name="ios-add" color={"white"} size={35} />
        </TouchableOpacity>

      </View>
      <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingTop: 10 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ flex: .9, fontSize: 14, fontWeight: 'bold', alignSelf: 'center', color: 'grey' }}>Bills</Text>
        </View>
        <View>
          {bills.length > 0 && bills.map((bill) => {
            return (
              <TouchableOpacity style={{ paddingTop: 15, flexDirection: 'row' }} key={bill.id} onPress={() => billPressed(bill)} >
                <View style={{}}>
                  <Ionicons style={{}} name="ios-checkmark-circle" color={isBillSelected(bill.id) ? Colors.primaryColor : "lightgrey"} size={30} />
                </View>
                <View style={{ marginLeft: 15, flexGrow: 1, paddingLeft: 5 }}>
                  <Text style={{ fontSize: 14, fontWeight: '600' }}>{bill.companyName}</Text>
                  <Text style={{ fontSize: 14 }}>{bill.ref1}{bill.ref2 != '' && ` (${bill.ref2})`}</Text>
                  <Text style={{ fontSize: 12 }}>RM{Dinero({ amount: bill.amount }).toFormat("0.00")}</Text>
                </View>

              </TouchableOpacity>)
          })
          }
          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <Text style={{ fontSize: 12, color: 'grey' }}>Service Fee RM {Dinero({ amount: selectedBills.length * 50 }).toFormat("0.00")}</Text>
            <Text style={{ fontWeight: '600', fontSize: 20 }}>Total RM {Dinero({ amount: amount + (selectedBills.length * 50) }).toFormat("0.00")}</Text>
            <TouchableOpacity onPress={payBillsPressed} style={{ paddingHorizontal: 10, backgroundColor: Colors.primaryColor, borderRadius: 5, paddingVertical: 10 }}>
              <Text style={{ color: 'white', fontWeight: '600', textAlign: 'center' }}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </ScrollView>
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
