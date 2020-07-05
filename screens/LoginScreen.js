import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import userSlice, { userInfoSelector } from '../features/accounts/userSlice'
const userAction = userSlice.actions

import Colors from '../constants/Colors'
import { userLogin } from '../features/accounts/userSaga'
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const userInfo = useSelector(state => userInfoSelector(state))

  const submitPressed = () => {
    if (email != '' && !userInfo.isLogin) {
      dispatch(userAction.userLogin({ password, email, userInfoCreated }))
    } else {
      alert('Please enter valid email address')
    }
  }
  const userInfoCreated = () => {
    // navigation.navigate("Main")
  }
  const registerPressed = () => {
    navigation.navigate("Landing")
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{

          backgroundColor: Colors.primaryColor,
          flex: 1,
          paddingTop: Constants.statusBarHeight + 10,
        }}>
        <View style={{ flex: .3, overflow: 'hidden' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
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
        <View style={{ flex: .5, paddingHorizontal: 20, }}>
          <TextInput
            maxLength={40}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder='Email'
            placeholderTextColor="lightgrey"
            autoCapitalize='none'
            keyboardType='email-address'
            style={{ borderRadius: 5, color: 'white', borderColor: 'white', marginTop: 33, borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }}
          />
          <TextInput
            maxLength={40}
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder='Password'
            placeholderTextColor="lightgrey"
            autoCapitalize='none'
            secureTextEntry={true}
            style={{ marginTop: 20, borderRadius: 5, color: 'white', borderColor: 'white', borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }}
          />
          <Text style={{ color: 'white', marginTop: 10, fontSize: 14 }} onPress={() => navigation.navigate('ResetPassword')} >Forgot Password?</Text>

          <TouchableOpacity style={{ borderRadius: 5, marginTop: 20, marginBottom: 10, borderWidth: 1, borderColor: 'white', paddingVertical: 5 }} onPress={submitPressed}>
            {userInfo.isLogin ?
              <ActivityIndicator size='small' color='white' style={{ height: 35, alignSelf: 'center' }} /> :
              <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Login</Text>
            }
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback >
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


