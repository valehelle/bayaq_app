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
import Colors from '../constants/Colors'
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
      setBill({ ...bill, billerCode: billDetail.billerCode, companyName: billDetail.companyName, type: billDetail.type })
    }
  }, [])

  const createBillPressed = () => {
    if (bill.ref1 != '' || bill.ref2 != '') {
      navigation.navigate('AddAmount', { bill, billStatus: 'CREATE' })
    } else {
      alert('Please enter all the required information.')
    }
  }
  const backButtonPressed = () => {
    navigation.goBack()
  }

  return (

    <View style={styles.container}>
      <View><Text style={{ color: 'white', fontSize: 16, padding: 10, fontWeight: 'bold' }}>{bill.companyName}</Text></View>
      <View style={{ backgroundColor: 'white', paddingTop: 20, height: '100%', borderTopStartRadius: 10, borderTopEndRadius: 10 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: .5 }}>
            <TouchableOpacity style={{ padding: 5, paddingLeft: 0 }} onPress={backButtonPressed}>
              <Text style={{ marginLeft: 20, color: Colors.primaryColor, textAlign: 'left' }}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: .5 }}>
            <TouchableOpacity style={{ padding: 5, paddingRight: 0 }} onPress={createBillPressed}>
              <Text style={{ marginRight: 20, color: Colors.primaryColor, textAlign: 'right' }}>Next</Text>
            </TouchableOpacity>
          </View>


        </View>

        <View style={{ marginTop: 10, paddingHorizontal: 20 }}>
          <Text>Account Number</Text>
          <TextInput
            maxLength={40}
            onChangeText={(text) => setBill({ ...bill, ref1: text })}
            value={bill.ref1}
            keyboardType='decimal-pad'
            style={{ marginTop: 10, borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }}
          />
          {bill.type == 'TELCO' && (
            <View style={{ marginTop: 20 }}>
              <Text>Phone Number:</Text>
              <TextInput
                maxLength={40}
                value={bill.ref2}
                onChangeText={(text) => setBill({ ...bill, ref2: text })}
                style={{ marginTop: 10, borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }}
              />
            </View>
          )}
        </View>
      </View>
    </View >
  );
}

InsertBillDetailScreen.navigationOptions = {
  header: null,
};
InsertBillDetailScreen.path = 'insert_bill'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
  },
});
