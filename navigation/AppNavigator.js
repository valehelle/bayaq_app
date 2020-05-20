import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import TermsAndConditionScreen from '../screens/TermsAndConditionScreen';


const LandingNavigator = createStackNavigator(
  {
    Landing: LandingScreen,
    TermsAndCondition: TermsAndConditionScreen
  }
);




export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Login: LoginScreen,
    TermsAndCondition: TermsAndConditionScreen,
    AuthLoading: AuthLoadingScreen,
    Main: MainTabNavigator,
    Landing: LandingNavigator,
  },
    {
      initialRouteName: 'AuthLoading',
    })
);


