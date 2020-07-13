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
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { useDispatch } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native';
import Colors from '../constants/Colors'
import { Dimensions } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

export default function InsertBillDetailScreen() {
  const dispatch = useDispatch()
  const route = useRoute();
  const navigation = useNavigation()
  const [bill, setBill] = useState({
    ref1: '',
    ref2: '',
    billerCode: '',
    amount: '0.00',
  })
  const { image, title } = route.params
  const billObject = route.params.bill
  useEffect(() => {
    const billDetail = route.params.bill
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
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 50} behavior={Platform.OS == "ios" ? "padding" : "height"} style={{ flex: 1, backgroundColor: Colors.headerColor }}>
        <ImageBackground source={image} style={{ flex: .4 }}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,.3)', paddingTop: Constants.statusBarHeight, }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
              <Ionicons name="ios-arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <View style={{ height: '100%', justifyContent: 'center' }}>
              <Text style={{ marginBottom: 70, width: '100%', height: 100, color: 'white', fontSize: 40, fontWeight: 'bold', textAlign: 'center', paddingHorizontal: 20 }}>{title}</Text>
            </View>
          </View>
        </ImageBackground>
        <View style={{ flex: .6, backgroundColor: 'white', paddingHorizontal: 20, paddingTop: 10 }}>
          <View style={{ top: -(screenWidth * .28) / 2 }}>
            <View
              style={{
                height: screenWidth * .22,
                width: screenWidth * .22,
                backgroundColor: 'white',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                borderRadius: 10,
                elevation: 5,
                alignSelf: 'flex-end'
              }}
            >
              <Image style={{ borderRadius: 10, height: '100%', width: '100%' }} source={{ uri: billObject.image }} />
            </View>
            <Text style={{ alignSelf: 'flex-end', marginTop: 5, width: screenWidth * .22, color: 'grey', fontSize: 11, textAlign: 'center' }}>{billObject.companyName}</Text>

            <TextInput
              style={{
                borderRadius: 10,
                borderColor: 'lightgrey',
                borderWidth: 1,
                padding: 10,
                marginTop: 20,
                marginBottom: 10,
              }}
              maxLength={40}
              onChangeText={(text) => setBill({ ...bill, ref1: text })}
              value={bill.ref1}
              placeholder='Account Number'
            />
            {bill.type == 'TELCO' && (
              <View>
                <TextInput
                  style={{
                    borderRadius: 10,
                    borderColor: 'lightgrey',
                    borderWidth: 1,
                    padding: 10
                  }}
                  maxLength={40}
                  placeholder="Phone Number"
                  value={bill.ref2}
                  onChangeText={(text) => setBill({ ...bill, ref2: text })}
                />
              </View>
            )}
            {bill.billerCode === '40386' && (
              <View >
                <TextInput
                  style={{
                    borderRadius: 10,
                    borderColor: 'lightgrey',
                    borderWidth: 1,
                    padding: 10
                  }}
                  maxLength={40}
                  placeholder="Contract Account Number"
                  value={bill.ref2}
                  onChangeText={(text) => setBill({ ...bill, ref2: text })}
                />
              </View>
            )}
            {bill.billerCode === '37234' && (
              <View >
                <TextInput
                  style={{
                    borderRadius: 10,
                    borderColor: 'lightgrey',
                    borderWidth: 1,
                    padding: 10
                  }}
                  placeholder="Bill Code No"
                  maxLength={40}
                  value={bill.ref2}
                  onChangeText={(text) => setBill({ ...bill, ref2: text })}
                />
              </View>
            )}
          </View>
        </View>
        <View style={{ flex: .2, width: '100%', backgroundColor: 'white', paddingHorizontal: 20, justifyContent: 'center' }}>
          <TouchableOpacity style={{ borderWidth: 1, borderColor: 'lightgrey', borderRadius: 10, paddingVertical: 10 }} onPress={createBillPressed}>
            <Text style={{ fontSize: 20, fontWeight: '600', textAlign: 'center', color: Colors.secondaryColor }}>Next</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView >
    </TouchableWithoutFeedback>
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

