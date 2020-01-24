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
  TextInput
} from 'react-native';

import { useDispatch } from 'react-redux'
import { addBill } from '../features/bills/billsSaga'
import { NavigationActions } from 'react-navigation';


export default function InsertBillDetailScreen({ navigation }) {
  const dispatch = useDispatch()
  const [bill, setBill] = useState({
    ref1: '',
    ref2: '',
    billerCode: '',
  })
  useEffect(() => {
    console.log(navigation)
    const bill = navigation.getParam('bill', 'NO-ID')
    if (typeof bill === 'string' || bill instanceof String) {

      navigation.navigate('Home')
    } else {
      setBill({ billerCode: bill.billerCode })
    }
  }, [])

  const createBillPressed = () => {
    dispatch(addBill({ bill, billCreated }))
  }

  const billCreated = () => {
    navigation.navigate('Home')
  }
  return (
    <View style={styles.container}>
      <TextInput
        editable={false}
        maxLength={40}
        value={bill.billerCode.toString()}
      />
      <TextInput
        editable
        maxLength={40}
        onChangeText={(text) => setBill({ ...bill, ref1: text })}
        value={bill.ref1}
      />
      <TextInput
        editable
        maxLength={40}
        onChangeText={(text) => setBill({ ...bill, ref2: text })}
        value={bill.ref2}

      />
      <TouchableOpacity onPress={createBillPressed}>
        <Text>Click Me</Text>
      </TouchableOpacity>
    </View>
  );
}

InsertBillDetailScreen.navigationOptions = {
  header: null,
};
InsertBillDetailScreen.path = ''

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 400,
    backgroundColor: '#fff',
  },
});
