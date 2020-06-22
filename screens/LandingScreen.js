import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  TextInput,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native';
import * as Analytics from 'expo-firebase-analytics';

import { useDispatch, useSelector } from 'react-redux';
import userSlice, { userInfoSelector } from '../features/accounts/userSlice'
import { wakeUpAction } from '../features/accounts/userSaga'
import Colors from '../constants/Colors'
import Constants from 'expo-constants';

const userAction = userSlice.actions

export default function LandingScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const userInfo = useSelector(state => userInfoSelector(state))
  const dispatch = useDispatch()
  const submitPressed = () => {
    if (email != '') {
      if (!userInfo.isRegister) {
        dispatch(userAction.addUserInfo({ password, fullName, email, userInfoCreated }))

      }
    } else {
      alert('Please enter valid email address for invoice purpose.')
    }
  }
  const termsPressed = () => {
    navigation.navigate("TermsAndCondition")
  }
  const loginPressed = () => {
    navigation.navigate("Login")
  }
  const userInfoCreated = () => {
    navigation.navigate("Main")
  }
  useEffect(() => {

    !__DEV__ && Analytics.setCurrentScreen('Landing')
    dispatch(wakeUpAction())
  }, [])
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "padding"}
        style={{
          backgroundColor: Colors.primaryColor,
          flex: 1,
          paddingTop: Constants.statusBarHeight + 10,
        }}>
        <View style={{ flex: .5, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
          <Image
            resizeMode='contain'
            style={{
              width: 70,
              height: 70
            }}
            source={require('../assets/images/icon2.png')} />
          <Text style={{ marginLeft: 5, fontWeight: '600', color: 'white', fontSize: 20, marginTop: 10 }}>Bayaq</Text>
          <Image
            resizeMode='cover'
            style={{
              width: '100%',
              height: 160,
            }}
            source={require('../assets/images/landing.png')} />
        </View>
        <View style={{ flex: .5, paddingHorizontal: 20, }}>
          <TextInput
            maxLength={40}
            placeholder='Full Name'
            placeholderTextColor="lightgrey"
            onChangeText={(text) => setFullName(text)}
            value={fullName}
            autoCapitalize='none'
            style={{ borderRadius: 5, color: 'white', borderColor: 'white', marginTop: 10, borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }}
          />
          <TextInput
            maxLength={40}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder='Email'
            placeholderTextColor="lightgrey"
            keyboardType='email-address'
            autoCapitalize='none'
            style={{ marginTop: 20, borderRadius: 5, color: 'white', borderColor: 'white', borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }}
          />
          <TextInput
            maxLength={40}
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder='Password'
            placeholderTextColor="lightgrey"
            secureTextEntry={true}
            autoCapitalize='none'
            style={{ marginTop: 20, borderRadius: 5, color: 'white', borderColor: 'white', borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }}
          />
          <TouchableOpacity style={{ borderRadius: 10, marginTop: 20, marginBottom: 10, borderWidth: 1, borderColor: 'white', paddingVertical: 5 }} onPress={submitPressed}>
            <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Register</Text>
          </TouchableOpacity>

          <Text style={{ color: 'white', fontSize: 11, marginBottom: 10 }}>
            Already have an account? Click here to <Text onPress={loginPressed} style={{ fontSize: 12, fontWeight: 'bold' }}> Login</Text>.
        </Text>

          <Text style={{ color: 'white', fontSize: 11, marginBottom: 10 }}>
            By clicking submit you are agreeing to the<Text> </Text>
            <Text onPress={() => navigation.navigate('Terms')} style={{ fontSize: 12, fontWeight: 'bold' }}>Terms and Conditions</Text>.
        </Text>

        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}



LandingScreen.navigationOptions = {
  header: null,
};
LandingScreen.path = ''

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 50,
    backgroundColor: Colors.primaryColor,
    flex: 1,
  },
});


