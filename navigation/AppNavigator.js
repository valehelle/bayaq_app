import React, { useEffect } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { useSelector, useDispatch } from 'react-redux'

import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { getUserToken } from '../features/accounts/userSaga'
import { userInfoSelector } from '../features/accounts/userSlice'
import TermsAndConditionScreen from '../screens/TermsAndConditionScreen';


import {
  AsyncStorage
} from 'react-native';

const Main = createStackNavigator();

export default AppNavigator = () => {
  const dispatch = useDispatch()
  const userInfo = useSelector(state => userInfoSelector(state))

  useEffect(() => {
    dispatch(getUserToken())
  }, [])
  if (userInfo.token == null) {
    // We haven't finished checking for the token yet
    return <AuthLoadingScreen />;
  }


  return (
    <NavigationContainer>
      <Main.Navigator headerMode="none">
        {userInfo.token != '' ? <Main.Screen name="Main" component={MainTabNavigator} /> :
          <>
            <Main.Screen name="Landing" component={LandingScreen}

              options={{
                title: 'Sign in',
                // When logging out, a pop animation feels intuitive
                // You can remove this if you want the default 'push' animation
                animationTypeForReplace: 'pop',
              }}
            />
            <Main.Screen name="Login" component={LoginScreen} />
            <Main.Screen name="Payment" component={LandingScreen} />
            <Main.Screen name="ResetPassword" component={ResetPasswordScreen} />
            <Main.Screen name="Terms" component={TermsAndConditionScreen} />


          </>
        }


      </Main.Navigator>
    </NavigationContainer>
  )
}


