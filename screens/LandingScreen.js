import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native';
import { useDispatch } from 'react-redux';
import userSlice from '../features/accounts/userSlice'
import Colors from '../constants/Colors'
const userAction = userSlice.actions

export default function LandingScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()
  const submitPressed = () => {

    dispatch(userAction.addUserInfo({ email, userInfoCreated }))
  }
  const userInfoCreated = () => {
    navigation.navigate("Main")
  }
  return (
    <View style={styles.container}>
      <Text style={{ marginTop: '20vh', fontWeight: 600, color: 'white', fontSize: 40 }}>Pay all your bills in once click</Text>
      <View style={{ marginTop: 20 }}>
        <Text style={{ color: 'white' }}>Email</Text>
        <TextInput
          maxLength={40}
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType='email-address'
          style={{ color: 'white', borderColor: 'white', marginTop: 10, borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }}
        />
        <TouchableOpacity onPress={submitPressed}>
          <Text style={{ color: 'white', display: 'inline-block', fontSize: 20, marginTop: 10 }}>Submit</Text>
        </TouchableOpacity>
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
    flex: 1,
    paddingHorizontal: 20,

    backgroundColor: Colors.primaryColor,
  },
});
