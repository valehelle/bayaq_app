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
  TouchableWithoutFeedback
} from 'react-native';
import { useDispatch } from 'react-redux';
import userSlice from '../features/accounts/userSlice'
import Colors from '../constants/Colors'
const userAction = userSlice.actions
import { userLogin } from '../features/accounts/userSaga'
import Constants from 'expo-constants';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const submitPressed = () => {
    if (email != '') {
      dispatch(userLogin({ password, email, userInfoCreated }))
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
          paddingHorizontal: 20,
          backgroundColor: Colors.primaryColor,
          flex: 1,
          paddingTop: Constants.statusBarHeight + 10,
        }}>
        <View style={{ flex: .5, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            resizeMode='contain'
            style={{
              width: 70,
              height: 70
            }}
            source={require('../assets/images/icon.png')} />
          <Text style={{ marginLeft: 5, fontWeight: '600', color: 'white', fontSize: 20, marginTop: 10, marginBottom: 30 }}>Bayaq</Text>
          <Image
            resizeMode='contain'
            style={{
              width: 300,
              height: 150,
            }}
            source={require('../assets/images/register.png')} />
        </View>
        <View style={{ flex: .5, marginTop: 45 }}>
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
            <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Login</Text>
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


