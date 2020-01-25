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
import { billsSelector } from '../features/bills/billsSlice'
import { getBill } from '../features/bills/billsSaga'

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch()
  const bills = useSelector(state => billsSelector(state))
  const addBillPressed = () => {
    navigation.navigate('SelectBill')
  }
  const billPressed = (bill) => {
    navigation.navigate('AddAmount', { bill })
  }
  useEffect(() => {
    dispatch(getBill())
  }, [])
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={addBillPressed}>
        <Text>Press me</Text>
      </TouchableOpacity>
      {bills.length > 0 && bills.map((bill) => <TouchableOpacity onPress={() => billPressed(bill)} ><Text>{bill.billerCode}</Text></TouchableOpacity>)}

    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};
HomeScreen.path = ''

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 400,
    backgroundColor: '#fff',
  },
});
