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
  AsyncStorage
} from 'react-native';
import Colors from '../constants/Colors'
import billsSlice from '../features/bills/billsSlice'
const billsAction = billsSlice.actions
import { useDispatch } from 'react-redux'


export default function AuthLoadingScreen({ navigation }) {
  useEffect(() => {
  }, [])
  return (
    <View style={{ backgroundColor: Colors.primaryColor, flex: 1 }}>
      <Image style={{ "resizeMode": "contain", width: '100%', height: '100%' }} source={require('../assets/images/splash2.png')} />
    </View>
  )
}

AuthLoadingScreen.navigationOptions = {
  header: null,
};

AuthLoadingScreen.path = ''

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center'
  },
});
