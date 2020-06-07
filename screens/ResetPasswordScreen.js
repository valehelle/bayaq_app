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
import Constants from 'expo-constants';

const userAction = userSlice.actions

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()
  const submitPressed = () => {
    if (email != '') {
      dispatch(userAction.resetPassword({ email, resetPasswordSuccess }))
    } else {
      alert('Please enter valid email address')
    }
  }
  const resetPasswordSuccess = () => {
    alert(`An email with a link has been sent to ${email}. Please open the link in your phone.`)
  }
  return (

    <View style={{
      paddingHorizontal: 20,
      backgroundColor: Colors.primaryColor,
      flex: 1,
      paddingTop: Constants.statusBarHeight
    }}>
      <View style={{ flex: .5, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          resizeMode='contain'
          style={{
            width: 100,
            height: 100
          }}
          source={require('../assets/images/icon.png')} />
        <Text style={{ marginLeft: 5, fontWeight: '600', color: 'white', fontSize: 30, marginTop: 10 }}>Bayaq</Text>

      </View>
      <View style={{ flex: .5 }}>
        <TextInput
          maxLength={40}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder='Email'
          placeholderTextColor="lightgrey"
          autoCapitalize='none'
          keyboardType='email-address'
          style={{ borderRadius: 5, color: 'white', borderColor: 'white', marginTop: 10, borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }}
        />
        <TouchableOpacity style={{ borderRadius: 5, marginTop: 20, marginBottom: 10, borderWidth: 1, borderColor: 'white', paddingVertical: 5 }} onPress={submitPressed}>
          <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Reset Password</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

LoginScreen.navigationOptions = {
  header: null,
};
LoginScreen.path = '/login'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 50,
    backgroundColor: Colors.primaryColor,
  },
});


