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
import { wakeUpAction } from '../features/accounts/userSaga'
import Colors from '../constants/Colors'
import Constants from 'expo-constants';

const userAction = userSlice.actions

export default function LandingScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const submitPressed = () => {
    if (email != '') {
      dispatch(userAction.addUserInfo({ password, fullName, email, userInfoCreated }))
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
    dispatch(wakeUpAction())
  }, [])
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
          placeholder='Full Name'
          placeholderTextColor="lightgrey"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          style={{ borderRadius: 5, color: 'white', borderColor: 'white', marginTop: 10, borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }}
        />
        <TextInput
          maxLength={40}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder='Email'
          placeholderTextColor="lightgrey"
          keyboardType='email-address'
          style={{ marginTop: 20, borderRadius: 5, color: 'white', borderColor: 'white', borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }}
        />
        <TextInput
          maxLength={40}
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder='Password'
          placeholderTextColor="lightgrey"
          secureTextEntry={true}
          style={{ marginTop: 20, borderRadius: 5, color: 'white', borderColor: 'white', borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }}
        />
        <TouchableOpacity style={{ borderRadius: 10, marginTop: 20, marginBottom: 10, borderWidth: 1, borderColor: 'white', paddingVertical: 5 }} onPress={submitPressed}>
          <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Register</Text>
        </TouchableOpacity>

        <Text style={{ color: 'white', fontSize: 14, marginBottom: 10 }}>
          Already have an account? Click here to <Text onPress={loginPressed} style={{ fontSize: 14, fontWeight: 'bold' }}> Login</Text>.
        </Text>

        <Text style={{ color: 'white', fontSize: 14, marginBottom: 10 }}>
          By clicking submit you are agreeing to the<Text> </Text>
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Terms and Conditions</Text>.
        </Text>

      </View>
    </View>
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


