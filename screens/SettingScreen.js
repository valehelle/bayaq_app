import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView
} from 'react-native';
import { useDispatch } from 'react-redux';
import userSlice from '../features/accounts/userSlice'
import Colors from '../constants/Colors'
const userAction = userSlice.actions

export default function SettingScreen({ navigation }) {
  const dispatch = useDispatch()
  const logoutPressed = () => {
    dispatch(userAction.userLogout())

  }
  return (
    <View style={{ paddingTop: 30 }}>
      <Text>Setting Screen</Text>
      <TouchableOpacity onPress={logoutPressed}><Text>Logout</Text></TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 50,
    backgroundColor: Colors.primaryColor,
  },
});


