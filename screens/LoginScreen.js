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
import { userLogin } from '../features/accounts/userSaga'

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
    navigation.navigate("Main")
  }
  const registerPressed = () => {
    navigation.navigate("Landing")
  }

  return (
    <ScrollView className="scrollView" style={styles.container}>
      <View style={{ height: 30, justifyContent: 'flex-end' }}>
        <Text style={{ fontWeight: '600', color: 'white', fontSize: 40 }}>Bayaq</Text>
        <Text style={{ fontWeight: '400', color: 'white', fontSize: 35, marginTop: 20 }}>Pay all your bills in one click</Text>
      </View>
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
        <Text style={{ color: 'white', marginTop: 10 }}>Password:</Text>
        <TextInput
          maxLength={40}
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCapitalize='none'
          secureTextEntry={true}
          style={{ color: 'white', borderColor: 'white', marginTop: 10, borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }}
        />
        <Text style={{ color: 'white', fontSize: 14, marginBottom: 10 }}>
          New to bayaq? Click here to
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}> Register</Text>.
        </Text>

        <TouchableOpacity style={{ marginTop: 20, marginBottom: 10, borderWidth: 1, borderColor: 'white', paddingVertical: 5 }} onPress={submitPressed}>
          <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Login</Text>
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


