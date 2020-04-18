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
  return (
    <ScrollView className="scrollView" style={styles.container}>
      <View style={{ marginTop: '10vh', justifyContent: 'flex-end' }}>
        <Text style={{ fontWeight: '600', color: 'white', fontSize: 40 }}>Bayaq</Text>
        <Text style={{ fontWeight: '400', color: 'white', fontSize: 35, marginTop: 20 }}>Pay all your bills in one click</Text>
      </View>
      <View style={{ padding: 5, alignItems: 'center' }}>
        <Image resizeMode='contain' style={{
          width: '100%',
          height: '80vh',
        }}
          source={require('../assets/images/dashboard.png')} />
      </View>
      <View>
        <Text style={{ color: 'white' }}>Full Name:</Text>
        <TextInput
          maxLength={40}
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          style={{ color: 'white', borderColor: 'white', marginTop: 10, borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }}
        />
        <Text style={{ color: 'white', marginTop: 10 }}>Email:</Text>
        <TextInput
          maxLength={40}
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType='email-address'
          style={{ color: 'white', borderColor: 'white', marginTop: 10, borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }}
        />
        <Text style={{ color: 'white', marginTop: 10 }}>Password:</Text>
        <TextInput
          maxLength={40}
          onChangeText={(text) => setPassword(text)}
          value={password}
          keyboardType='password'
          style={{ color: 'white', borderColor: 'white', marginTop: 10, borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }}
        />
        <TouchableOpacity style={{ marginTop: 20, marginBottom: 10, borderWidth: 1, borderColor: 'white', paddingVertical: 5 }} onPress={submitPressed}>
          <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Register</Text>
        </TouchableOpacity>

        <Text style={{ color: 'white', fontSize: 14, marginBottom: 10 }}>
          Already have an account? Click here to
          <TouchableOpacity onPress={loginPressed}><Text style={{ fontSize: 14, fontWeight: 'bold' }}> Login</Text></TouchableOpacity>.
        </Text>

        <Text style={{ color: 'white', fontSize: 14, marginBottom: 10 }}>
          By clicking submit you are agreeing to the<Text> </Text>
          <TouchableOpacity onPress={termsPressed}><Text style={{ fontSize: 14, fontWeight: 'bold' }}>Terms and Conditions</Text></TouchableOpacity>.
        </Text>

      </View>
    </ScrollView>
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
  },
});


