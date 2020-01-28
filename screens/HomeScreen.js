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
import billsSlice, { billsSelector, totalBillsAmountSelector } from '../features/bills/billsSlice'
import { getBill, getBillAmount } from '../features/bills/billsSaga'
import { getUserInfo } from '../features/accounts/userSaga'
const billsAction = billsSlice.actions
import Dinero from 'dinero.js'


export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch()
  const bills = useSelector(state => billsSelector(state))
  const amount = useSelector(state => totalBillsAmountSelector(state))

  const addBillPressed = () => {
    navigation.navigate('SelectBill')
  }
  const billPressed = (bill) => {
    const newBill = { ...bill, amount: Dinero({ amount: bill.amount }).toFormat("0.00") }
    navigation.navigate('AddAmount', { bill: newBill, billStatus: 'UPDATE' })
  }
  const payBillsPressed = () => {
    dispatch(billsAction.payBills())
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
    <View style={styles.container}>
      <TouchableOpacity onPress={payBillsPressed}>
        <Text>Pay {Dinero({ amount: amount }).toFormat("0.00")}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={addBillPressed}>
        <Text>Press me</Text>
      </TouchableOpacity>
      {bills.length > 0 && bills.map((bill) => <TouchableOpacity onPress={() => billPressed(bill)} ><Text>{bill.billerCode} - {bill.amount} - {bill.companyName}</Text></TouchableOpacity>)}

    </View>
  );
}

HomeScreen.navigationOptions = {

};
HomeScreen.path = ''

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 400,
    backgroundColor: '#fff',
  },
});
