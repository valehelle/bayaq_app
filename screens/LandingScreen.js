import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  TextInput
} from 'react-native';
import { useDispatch } from 'react-redux';
import userSlice from '../features/accounts/userSlice'
const userAction = userSlice.actions

export default function LandingScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const dispatch = useDispatch()
  const submitPressed = () => {

    dispatch(userAction.addUserInfo({ email, phone, userInfoCreated }))
  }
  const userInfoCreated = () => {
    navigation.navigate("Main")
  }
  return (
    <View style={styles.container}>
      <Text>Email: </Text>
      <TextInput
        maxLength={40}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Text>Phone:</Text>
      <TextInput
        maxLength={40}
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <TouchableOpacity onPress={submitPressed}>
        <Text>Submit</Text>
      </TouchableOpacity>
      <Text>Landing</Text>
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
    paddingTop: 400,
    backgroundColor: '#fff',
  },
});
