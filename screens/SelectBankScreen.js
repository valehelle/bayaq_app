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
import userSlice from '../features/accounts/userSlice'
const userAction = userSlice.actions
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';

const billsAction = billsSlice.actions

import { banks } from '../constants/Banks'
import Colors from '../constants/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function SelectBankScreen() {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const router = useRoute()
  const { proceedPayment } = router.params
  const selectBankPressed = (bank) => {
    dispatch(userAction.setUserBank({ bankCode: bank.code }))
    if (proceedPayment) {
      navigation.navigate('Payment', { bankCode: bank.code })
    } else {
      navigation.goBack()
    }
  }

  const backButtonPressed = () => {
    navigation.goBack()
  }


  return (

    <View style={{ flex: 1, backgroundColor: Colors.headerColor }}>
      <View style={{ flex: .4, paddingTop: Constants.statusBarHeight, }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
            <Ionicons name="ios-arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={{ height: '100%', justifyContent: 'center' }}>
            <Text style={{ marginBottom: 120, width: '100%', color: 'white', fontSize: 40, fontWeight: 'bold', textAlign: 'center' }}>Select Bank</Text>

          </View>
        </View>
      </View>
      <View style={{ flex: .8, backgroundColor: 'white', paddingTop: 10 }}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
          {banks.map((bank, index) =>
            <View key={index}  >
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
          <View style={{ height: 30 }}></View>
        </ScrollView>
      </View>
    </View >
  );
}

SelectBankScreen.navigationOptions = {
  header: null,
};

SelectBankScreen.path = 'select_bank'

SelectBankScreen.defaultNavigationOptions = {
  animationEnabled: false,
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
  },
});
