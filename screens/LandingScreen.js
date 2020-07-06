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
      <View style={{ marginTop: '10vh', flexDirection: 'row' }}>
        <Image
          resizeMode='contain'
          style={{
            width: 50,
            height: 50
          }}
          source={require('../assets/images/icon.png')} />
        <Text style={{ marginLeft: 5, fontWeight: '600', color: 'white', fontSize: 40 }}>Bayaq</Text>

      </View>
      <View style={{ justifyContent: 'flex-end' }}>
        <Text style={{ fontWeight: '400', color: 'white', fontSize: 35, marginTop: 20 }}>The fastest way to pay your bills.</Text>
      </View>
      <View style={{ padding: 5, alignItems: 'center' }}>
        <Image resizeMode='contain' style={{
          width: '100%',
          height: '80vh',
        }}
          source={require('../assets/images/iphone.png')} />
        <Text style={{ textAlign: 'center', color: 'white', fontSize: 30, marginTop: 50 }}>Download it now from Google Play Store and Apple App Store!</Text>
        <View className="d-none d-sm-block" style={{ width: "100%" }}>
          <View style={{ height: '150px', width: '100%', flexDirection: 'row', marginTop: 50 }}>
            <TouchableOpacity style={{ height: '100%', width: '50%', flex: .7 }} onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.bayaqapp.www')}>
              <Image resizeMode='contain' style={{
                width: '100%',
                height: '100%',

              }}
                source={{ uri: 'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' }} />
            </TouchableOpacity>
            <Image resizeMode='contain' style={{
              flex: .3,
              width: 100,
              height: 100,
              alignSelf: 'center'
            }}
              source={require('../assets/images/android_qr.png')} />
          </View>


          <View style={{ height: '100px', width: '100%', flexDirection: 'row', marginTop: 100 }}>
            <TouchableOpacity style={{ height: '100%', width: '50%', flex: .7 }} onPress={() => Linking.openURL('https://apps.apple.com/my/app/bayaq/id1519715626')}>
              <Image resizeMode='contain' style={{
                width: '85%',
                height: '100%',
                alignSelf: 'center'
              }}
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1200px-Download_on_the_App_Store_Badge.svg.png' }} />
            </TouchableOpacity>
            <Image resizeMode='contain' style={{
              flex: .3,
              width: 100,
              height: 100,
              alignSelf: 'center'
            }}
              source={require('../assets/images/iphone_qr.png')} />
          </View>

        </View>
        <View className="d-block d-sm-none" style={{ width: '100%', flexDirection: 'row', marginTop: 50 }}>
          <TouchableOpacity style={{ height: '100%', width: '100%' }} onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.bayaqapp.www')}>
            <Image resizeMode='contain' style={{
              width: 250,
              height: 100,
              alignSelf: 'center'

            }}
              source={{ uri: 'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' }} />
          </TouchableOpacity>
        </View>

        <View className="d-block d-sm-none" style={{ width: '100%', flexDirection: 'row' }}>
          <TouchableOpacity style={{ height: '100%', width: '100%' }} onPress={() => Linking.openURL('https://apps.apple.com/my/app/bayaq/id1519715626')}>
            <Image resizeMode='contain' style={{
              width: 220,
              height: 100,
              alignSelf: 'center'
            }}
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1200px-Download_on_the_App_Store_Badge.svg.png' }} />
          </TouchableOpacity>
        </View>

      </View>
      <View>


        <Text style={{ color: 'white', fontSize: 14, marginBottom: 10, marginTop: 30, textAlign: 'center' }}>
          Copyright &copy; 2020 Bayaq PLT | Contact admin@bayaqapp.com<Text> </Text>
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


