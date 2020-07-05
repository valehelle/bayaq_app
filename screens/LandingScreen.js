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
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert
} from 'react-native';
import * as Analytics from 'expo-firebase-analytics';

import { useDispatch, useSelector } from 'react-redux';
import userSlice, { userInfoSelector } from '../features/accounts/userSlice'
import { wakeUpAction } from '../features/accounts/userSaga'
import Colors from '../constants/Colors'
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const userAction = userSlice.actions

export default function LandingScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [checkBoxState, setCheckBoxState] = useState(false)

  const userInfo = useSelector(state => userInfoSelector(state))
  const dispatch = useDispatch()
  const submitPressed = () => {
    if (email != '') {
      if (!userInfo.isRegister) {

        if (checkBoxState) {
          dispatch(userAction.addUserInfo({ password, fullName, email, userInfoCreated }))
        } else {
          Alert.alert(
            '',
            'Please accept our terms and conditions.',
            [
              {
                text: 'Okay', onPress: () => {
                  console.log('okay')
                }
              },
            ],
            { cancelable: false }
          )
        }

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
        <View style={{ flex: .3, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
          <Image
            resizeMode='contain'
            style={{
              width: 70,
              height: 70
            }}
            source={require('../assets/images/icon2.png')} />
          <Text style={{ marginLeft: 5, fontWeight: '600', color: 'white', fontSize: 20, marginTop: 10 }}>Bayaq</Text>
        </View>
        <View style={{ flex: .7, paddingHorizontal: 20, }}>
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
            {userInfo.isRegister ?
              <ActivityIndicator size='small' color='white' style={{ height: 35, alignSelf: 'center' }} /> :
              <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Register</Text>
            }
          </TouchableOpacity>

          <View style={{ marginTop: 10, flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => setCheckBoxState(!checkBoxState)}>
              <MaterialCommunityIcons name={checkBoxState ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24} color="white" />
            </TouchableOpacity>
            <Text onPress={() => navigation.navigate('Terms')} style={{ marginLeft: 5, color: 'white', fontSize: 12, fontWeight: 'bold', alignSelf: 'center' }}>I understand and accept the terms and condition.</Text>
          </View>


          <Text style={{ marginTop: 10, color: 'white', fontSize: 14, marginBottom: 10 }}>
            Already have an account? Click here to <Text onPress={loginPressed} style={{ fontSize: 12, fontWeight: 'bold' }}> Login</Text>.
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


