import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from '@react-navigation/core';
import { createStackNavigator } from 'react-navigation-stack';

import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import LandingScreen from '../screens/LandingScreen';
import TermsAndConditionScreen from '../screens/TermsAndConditionScreen';


const LandingNavigator = createStackNavigator(
  {
    Landing: LandingScreen,
    TermsAndCondition: TermsAndConditionScreen
  }
);

LandingNavigator.path = ''


const switchNavigator = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  AuthLoading: AuthLoadingScreen,
  Main: MainTabNavigator,
  Landing: LandingNavigator
},
  {
    initialRouteName: 'AuthLoading',
  });


export default createBrowserApp(switchNavigator);
