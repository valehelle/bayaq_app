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
import { Ionicons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import billsSlice from '../features/bills/billsSlice'

const billsAction = billsSlice.actions

import { banks } from '../constants/banks'
import Colors from '../constants/Colors';
export default function SelectBillScreen({ navigation }) {
  const dispatch = useDispatch()

  const selectBankPressed = (bank) => {
    dispatch(billsAction.payBills({ bankCode: bank.code }))
  }

  const backButtonPressed = () => {
    navigation.goBack()
  }


  return (
    <ScrollView style={{ paddingBottom: 20 }}>
      <View className="scrollView" style={styles.container}>
        <View><Text style={{ color: 'white', fontSize: 16, padding: 10, fontWeight: 'bold' }}>Select Bank</Text></View>
        <View style={{ backgroundColor: 'white', paddingTop: 20, height: '100%', borderTopStartRadius: 10, borderTopEndRadius: 10 }}>
          <View style={{ paddingLeft: 20 }}>
            <TouchableOpacity onPress={backButtonPressed}>
              <Text style={{ color: Colors.primaryColor, textAlign: 'left' }}>Cancel</Text>
            </TouchableOpacity>
          </View>

          {banks.map((bank, index) =>
            <View key={index} style={{ paddingHorizontal: 20 }} >
              <TouchableOpacity style={{ marginTop: 20 }} onPress={() => selectBankPressed(bank)}>
                <View style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                  borderRadius: 10, backgroundColor: bank.backgroundColor, height: 70,
                  justifyContent: 'center'
                }}>
                  <Text style={{ paddingLeft: 20, textAlign: 'left', fontSize: 20, fontWeight: 'bold', color: bank.textColor }}>{bank.name}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

        </View>
      </View >
    </ScrollView>
  );
}

SelectBillScreen.navigationOptions = {
  header: null,
};

SelectBillScreen.path = 'select_bank'

SelectBillScreen.defaultNavigationOptions = {
  animationEnabled: false,
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
  },
});
