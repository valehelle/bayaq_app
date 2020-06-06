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

import { useSelector, useDispatch } from 'react-redux';
import userSlice, { userInfoSelector } from '../features/accounts/userSlice'
import Colors from '../constants/Colors'
const userAction = userSlice.actions
import { userLogin } from '../features/accounts/userSaga'
export default function ChangePasswordScreen({ navigation }) {
  const user = useSelector(state => userInfoSelector(state))
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const dispatch = useDispatch()
  const submitPressed = () => {
    if (password === passwordConfirmation) {
      dispatch(userAction.changePassword({ password, token: user.resetToken }))
    } else {
      alert('Your password does not match.')
    }
  }

  return (
    <ScrollView className="scrollView" style={styles.container}>
      <View style={{ height: '30vh', justifyContent: 'flex-end' }}>
        <Text style={{ fontWeight: '600', color: 'white', fontSize: 40 }}>Bayaq</Text>
        <Text style={{ fontWeight: '400', color: 'white', fontSize: 35, marginTop: 20 }}>Change password</Text>
      </View>
      <View>
        <Text style={{ color: 'white', marginTop: 10 }}>Password:</Text>
        <TextInput
          maxLength={40}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          style={{ color: 'white', borderColor: 'white', marginTop: 10, borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }}
        />
        <Text style={{ color: 'white', marginTop: 10 }}>Password Confirmation:</Text>
        <TextInput
          maxLength={40}
          onChangeText={(text) => setPasswordConfirmation(text)}
          value={passwordConfirmation}
          secureTextEntry={true}
          style={{ color: 'white', borderColor: 'white', marginTop: 10, borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }}
        />

        <TouchableOpacity style={{ marginTop: 20, marginBottom: 10, borderWidth: 1, borderColor: 'white', paddingVertical: 5 }} onPress={submitPressed}>
          <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Change Password</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

ChangePasswordScreen.navigationOptions = {
  header: null,
};
ChangePasswordScreen.path = '/change_password'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 50,
    backgroundColor: Colors.primaryColor,
  },
});


