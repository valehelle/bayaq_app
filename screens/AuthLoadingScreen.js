import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';
import Colors from '../constants/Colors'
import billsSlice from '../features/bills/billsSlice'
const billsAction = billsSlice.actions
import userSlice from '../features/accounts/userSlice'
const userAction = userSlice.actions
import { useDispatch } from 'react-redux'


export default function AuthLoadingScreen({ navigation }) {
  const dispatch = useDispatch()
  async function isLoggedIn(navigation) {
    try {
      const value = await AsyncStorage.getItem('bayaqUserToken');
      navigation.navigate(value ? 'Main' : 'Landing');
    } catch (error) {
      console.log(error)
      // Error retrieving data
    }
  }
  async function resetPassword(navigation) {
    try {
      navigation.navigate('ChangePassword');
    } catch (error) {
      console.log(error)
      // Error retrieving data
    }
  }
  async function privacyPage(navigation) {
    try {
      setTimeout(() => navigation.navigate('TermsAndCondition'), 1000)
    } catch (error) {
      console.log(error)
      alert('error')
      // Error retrieving data
    }
  }
  async function requestReset(navigation) {
    try {
      setTimeout(() => navigation.navigate('ResetPasswordScreen'), 1000)
    } catch (error) {
      console.log(error)
      alert('error')
      // Error retrieving data
    }
  }


  useEffect(() => {
    const token = navigation.getParam('token', 'NO-TOKEN')
    const page = navigation.getParam('page', 'NO-TOKEN')



    if (token === 'NO-TOKEN') {
      const isSuccess = navigation.getParam('billplz[paid]', 'NO-ID') === 'NO-ID' ? false : true
      if (isSuccess) {
        const isPaid = navigation.getParam('billplz[paid]', 'NO-ID') === 'true' ? true : false
        if (isPaid) {
          dispatch(billsAction.setIsSuccess({ isSuccess }))
        }
      }
      isLoggedIn(navigation)
    } else {
      dispatch(userAction.setResetToken({ token }))

      resetPassword(navigation, { token })
    }

    if (page == 'privacy') {
      privacyPage(navigation)

    } else if (page == 'reset') {
      requestReset(navigation)
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: 'center', color: 'white', fontSize: 40, fontWeight: 'bold' }}>BAYAQ</Text>
    </View>
  );
}

AuthLoadingScreen.navigationOptions = {
  header: null,
};

AuthLoadingScreen.path = ''

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center'
  },
});
