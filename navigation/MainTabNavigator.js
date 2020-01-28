import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SelectBillScreen from '../screens/SelectBillScreen';
import InsertBillDetailScreen from '../screens/InsertBillDetailScreen';
import AddAmountScreen from '../screens/AddAmountScreen'
const config = Platform.select({
  web: { headerMode: 'screen', initialRouteName: 'Home' },
  default: {},
});

const MainStack = createStackNavigator(
  {
    Home: HomeScreen,
    SelectBill: SelectBillScreen,
    InsertBillDetail: InsertBillDetailScreen,
    AddAmount: AddAmountScreen
  },
  config
);

MainStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

MainStack.path = '';

export default MainStack

