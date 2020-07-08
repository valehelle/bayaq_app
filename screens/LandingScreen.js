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
const userAction = userSlice.actions
import * as Linking from 'expo-linking';
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
    <ScrollView className="scrollView" style={styles.container}>
      <View style={{ marginTop: '5vh', flexDirection: 'row' }}>
        <Image
          resizeMode='contain'
          style={{
            width: 50,
            height: 50
          }}
          source={require('../assets/images/icon.png')} />
        <Text style={{ marginLeft: 5, fontWeight: 'bold', color: 'white', fontSize: 40 }}>Bayaq</Text>

      </View>
      <View style={{ justifyContent: 'flex-end' }}>
        <Text style={{ fontWeight: '400', color: 'white', fontSize: 35, marginTop: 40 }}>The fastest way to pay your bills</Text>
        <Text style={{ color: 'white', fontSize: 20, marginTop: 20 }}>With Bayaq, you can pay all your bills in one place.</Text>
        <Text style={{ fontWeight: '400', color: 'white', fontSize: 20, marginTop: 30 }}>Get the Bayaq app today</Text>

      </View>
      <View style={{ flexDirection: 'column', marginTop: 10 }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={{ backgroundColor: '#429ef6', padding: 20, borderRadius: 10 }} onPress={() => Linking.openURL('https://apps.apple.com/my/app/bayaq/id1519715626')}>
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Download for iOS</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, marginTop: 20 }}>
          <TouchableOpacity style={{ backgroundColor: '#429ef6', padding: 20, borderRadius: 10 }} onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.bayaqapp.www')}>
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Download for Android</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ padding: 5, alignItems: 'center', marginTop: 20 }}>
        <Image resizeMode='contain' style={{
          width: '100%',
          height: '80vh',
        }}
          source={require('../assets/images/iphone.png')} />

      </View>
      <View>


        <Text style={{ color: 'white', fontSize: 14, marginBottom: 10, marginTop: 30, textAlign: 'center' }}>
          Copyright &copy; 2020 Bayaq PLT | Contact admin@bayaqapp.com | <TouchableOpacity onPress={() => navigation.navigate("TermsAndCondition")}><Text>Terms and Condition</Text></TouchableOpacity>
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


