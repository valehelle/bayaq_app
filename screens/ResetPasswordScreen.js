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
    <ScrollView className="scrollView" style={styles.container}>
      <View>
        <Text style={{ color: 'white', marginTop: 10 }}>Email:</Text>
        <TextInput
          maxLength={40}
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize='none'
          keyboardType='email-address'
          style={{ color: 'white', borderColor: 'white', marginTop: 10, borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }}
        />


        <TouchableOpacity style={{ marginTop: 20, marginBottom: 10, borderWidth: 1, borderColor: 'white', paddingVertical: 5 }} onPress={submitPressed}>
          <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Request Reset Password</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
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


