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
  const dispatch = useDispatch()
  const submitPressed = () => {
    if (email != '') {
      dispatch(userAction.addUserInfo({ email, userInfoCreated }))
    } else {
      alert('Please enter valid email address for invoice purpose.')
    }
  }
  const userInfoCreated = () => {
    navigation.navigate("Main")
  }
  return (
    <ScrollView style={styles.container}>
      <View style={{ height: '30vh', justifyContent: 'flex-end' }}>
        <Text style={{ fontWeight: '600', color: 'white', fontSize: 40 }}>Bayaq</Text>
        <Text style={{ fontWeight: '400', color: 'white', fontSize: 35, marginTop: 20 }}>Pay all your bills in one click</Text>
      </View>
      <View style={{ height: '100vh', padding: 5, alignItems: 'center' }}>
        <Image resizeMode='contain' style={{
          width: '100%',
          height: '100vh',
        }}
          source={require('../assets/images/dashboard.png')} />
      </View>
      <View style={{ marginTop: 5 }}>
        <Text style={{ color: 'white' }}>Email</Text>
        <TextInput
          maxLength={40}
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType='email-address'
          style={{ color: 'white', borderColor: 'white', marginTop: 10, borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }}
        />
        <TouchableOpacity style={{ marginTop: 10 }} onPress={submitPressed}>
          <Text style={{ color: 'white', fontSize: 20, marginTop: 10, textAlign: 'center' }}>Start</Text>
        </TouchableOpacity>
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
