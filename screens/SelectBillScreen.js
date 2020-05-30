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
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Dimensions } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

import { lineNetwork, waterWorks } from '../constants/JomPay'
import Colors from '../constants/Colors';
export default function SelectBillScreen() {
  const navigation = useNavigation()
  const router = useRoute()
  const { bills, title } = router.params
  console.log(router.params)

  const selectBillPressed = (bill) => {
    navigation.navigate('InsertBillDetail', { bill })
  }


  return (
    <View style={{ flex: 1, backgroundColor: Colors.headerColor }}>
      <View style={{ flex: .4, paddingTop: Constants.statusBarHeight, }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={{ height: '100%', justifyContent: 'center' }}>
            <Text style={{ marginBottom: 120, width: '100%', color: 'white', fontSize: 40, fontWeight: 'bold', textAlign: 'center' }}>{title}</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: .6, backgroundColor: 'white', flexDirection: 'row', flexWrap: 'wrap' }}>
        {bills.map((bill, index) =>
          <View key={index} style={{ width: screenWidth * .25, padding: 5 }} >
            <TouchableOpacity style={{ backgroundColor: Colors.secondaryColor, borderRadius: 5, height: 120, justifyContent: 'center' }} onPress={() => selectBillPressed(bill)}>
              <Text style={{ fontWeight: '600', textAlign: 'center', color: 'white' }}>{bill.companyName}</Text>
            </TouchableOpacity>
          </View>

        )}
      </View>
    </View >

  );
}

SelectBillScreen.navigationOptions = {
  header: null,
};

SelectBillScreen.path = 'select_bill'

SelectBillScreen.defaultNavigationOptions = {
  animationEnabled: false,
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
  },
});
