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

export default function InsertBillDetailScreen({ navigation }) {
  const dispatch = useDispatch()
  const [bill, setBill] = useState({
    ref1: '',
    ref2: '',
    billerCode: '',
    amount: 0
  })
  useEffect(() => {
    const billDetail = navigation.getParam('bill', 'NO-ID')
    if (typeof billDetail === 'string' || billDetail instanceof String) {

      navigation.navigate('Home')
    } else {
      setBill({ ...bill, billerCode: billDetail.billerCode, companyName: billDetail.companyName })
    }
  }, [])

  const createBillPressed = () => {
    navigation.navigate('AddAmount', { bill, billStatus: 'CREATE' })
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

      <TouchableOpacity onPress={createBillPressed}>
        <Text>Click Me</Text>
      </TouchableOpacity>
    </View>
  );
}

InsertBillDetailScreen.navigationOptions = {
  header: null,
};
InsertBillDetailScreen.path = 'insert_bill'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 400,
    backgroundColor: '#fff',
  },
});
