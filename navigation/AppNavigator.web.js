import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from '@react-navigation/core';

import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import LandingScreen from '../screens/LandingScreen';

const switchNavigator = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  AuthLoading: AuthLoadingScreen,
  Main: MainTabNavigator,
  Landing: LandingScreen
},
  {
    initialRouteName: 'AuthLoading',
  });


export default createBrowserApp(switchNavigator);
