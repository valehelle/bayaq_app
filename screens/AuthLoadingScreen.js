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
    <View style={styles.container}>
      <Text style={{ textAlign: 'center', color: 'white', fontSize: 40, fontWeight: 'bold' }}>BAYAQ</Text>
    </View>
  );
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
