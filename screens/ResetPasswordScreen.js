import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import { useDispatch } from 'react-redux';
import userSlice from '../features/accounts/userSlice'
import Colors from '../constants/Colors'
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

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
    navigation.goBack()
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{
        paddingHorizontal: 20,
        backgroundColor: Colors.primaryColor,
        flex: 1,
        paddingTop: Constants.statusBarHeight
      }}>
        <View style={{ flex: .4, overflow: 'hidden' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingVertical: 10 }}>
            <Ionicons name="ios-arrow-back" size={24} color="white" />
          </TouchableOpacity>

          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 27 }}>
            <Image
              resizeMode='contain'
              style={{
                width: 70,
                height: 70
              }}
              source={require('../assets/images/icon2.png')} />
            <Text style={{ marginLeft: 5, fontWeight: '600', color: 'white', fontSize: 20, marginTop: 10 }}>Bayaq</Text>
          </View>
        </View>
        <View style={{ flex: .6 }}>
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
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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


