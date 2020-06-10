import React, { useEffect, useRef } from 'react';
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
import * as Analytics from 'expo-firebase-analytics';

const Main = createStackNavigator();
// Gets the current screen from navigation state
const getActiveRouteName = state => {
  const route = state.routes[state.index];

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }

  return route.name;
};




export default AppNavigator = () => {
  const routeNameRef = useRef();
  const navigationRef = useRef();

  useEffect(() => {
    if (navigationRef.current) {
      const state = navigationRef.current.getRootState();

      // Save the initial route name
      routeNameRef.current = getActiveRouteName(state);
    }

  }, []);


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
    <NavigationContainer
      ref={navigationRef}
      onStateChange={state => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = getActiveRouteName(state);

        if (previousRouteName !== currentRouteName) {
          // The line below uses the expo-firebase-analytics tracker
          // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
          // Change this line to use another Mobile analytics SDK
          !__DEV__ && Analytics.setCurrentScreen(currentRouteName);

        }

        // Save the current route name for later comparision
        routeNameRef.current = currentRouteName;
      }}
    >
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


