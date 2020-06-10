import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  ScrollView
} from 'react-native';
import { Linking } from 'react-native'
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';

import { useSelector, useDispatch } from 'react-redux'

import userSlice from '../features/accounts/userSlice'
import Colors from '../constants/Colors'
import { userInfoSelector } from '../features/accounts/userSlice'
import { Ionicons } from '@expo/vector-icons';

const userAction = userSlice.actions

export default function SettingScreen({ navigation }) {
  const userInfo = useSelector(state => userInfoSelector(state))

  const dispatch = useDispatch()
  const logoutPressed = () => {
    Alert.alert(
      'Are you sure you want to logout?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK', onPress: () => {
            dispatch(userAction.userLogout())
          }
        },
      ],
      { cancelable: false }
    );


  }
  return (
    <View style={{ flex: 1, backgroundColor: Colors.headerColor }}>
      <View style={{ flex: .4, paddingTop: Constants.statusBarHeight, }}>
        <View style={{ flex: 1 }}>
          <View style={{ height: '100%' }}>
            <Text style={{ marginTop: 60, width: '100%', color: 'white', fontSize: 40, fontWeight: 'bold', textAlign: 'center' }}>Settings</Text>

          </View>
        </View>
      </View>
      <View style={{ flex: .8, backgroundColor: 'white', paddingTop: 10 }}>
        <Text style={{ paddingHorizontal: 20, marginTop: 10, fontWeight: 'bold' }}>{userInfo.profile.name}</Text>
        <Text style={{ paddingHorizontal: 20, fontWeight: 'bold' }}>{userInfo.profile.email}</Text>
        <Text style={{ paddingHorizontal: 20, marginTop: 10, fontWeight: 'bold', marginTop: 20 }}>About</Text>
        <View style={{ backgroundColor: Colors.secondaryColor, paddingHorizontal: 20, paddingVertical: 5, marginTop: 5 }}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { navigation.navigate('Terms') }}>
            <View style={{ flex: .7 }}>
              <Text style={{ color: 'white', fontSize: 15 }}>Terms of Use</Text>
            </View>
            <View style={{ flex: .3 }}>
              <Ionicons name="ios-arrow-forward" size={20} color='white' style={{ alignSelf: 'flex-end' }} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: Colors.secondaryColor, paddingHorizontal: 20, paddingVertical: 5, marginTop: 5 }}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { Linking.openURL('mailto:admin@bayaqapp.com') }}>
            <View style={{ flex: .7 }}>
              <Text style={{ color: 'white', fontSize: 15 }}>Contact Us</Text>
            </View>
            <View style={{ flex: .3 }}>
              <Ionicons name="ios-arrow-forward" size={20} color='white' style={{ alignSelf: 'flex-end' }} />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={{ paddingHorizontal: 20, marginTop: 10, fontWeight: 'bold', marginTop: 15 }}>Logins</Text>

        <View style={{ backgroundColor: Colors.secondaryColor, paddingHorizontal: 20, paddingVertical: 5, marginTop: 5 }}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={logoutPressed}>
            <View style={{ flex: .7 }}>
              <Text style={{ color: 'white', fontSize: 15 }}>Logout</Text>
            </View>
            <View style={{ flex: .3 }}>
              <Ionicons name="ios-arrow-forward" size={20} color={Colors.secondaryColor} style={{ alignSelf: 'flex-end' }} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ height: 30 }}></View>
      </View>
    </View >
  );
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 50,
    backgroundColor: Colors.primaryColor,
  },
});


