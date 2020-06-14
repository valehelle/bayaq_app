import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from '@react-navigation/core';
import { createStackNavigator } from 'react-navigation-stack';

import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';

import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import SupportScreen from '../screens/Support';


import TermsAndConditionScreen from '../screens/TermsAndConditionScreen';


const LandingNavigator = createStackNavigator(
  {
    Landing: LandingScreen,
    TermsAndCondition: TermsAndConditionScreen,
    SupportScreen: SupportScreen,
  }
);

LandingNavigator.path = 'landing'


const switchNavigator = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Login: LoginScreen,

  ChangePassword: ChangePasswordScreen,
  TermsAndCondition: TermsAndConditionScreen,
  AuthLoading: AuthLoadingScreen,
  Main: MainTabNavigator,
  Landing: LandingNavigator,

});


export default createBrowserApp(switchNavigator);
