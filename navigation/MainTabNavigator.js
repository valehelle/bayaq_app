import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SelectBillScreen from '../screens/SelectBillScreen';
import InvoiceScreen from '../screens/InvoiceScreen'
import InsertBillDetailScreen from '../screens/InsertBillDetailScreen';
import AddAmountScreen from '../screens/AddAmountScreen'
import SettingScreen from '../screens/SettingScreen'

import SuccessScreen from '../screens/SuccessScreen';
import SelectBankScreen from '../screens/SelectBankScreen';
import Colors from '../constants/Colors'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import PaymentScreen from '../screens/PaymentScreen';
const config = Platform.select({
  web: { headerMode: 'screen', initialRouteName: 'Home' },
  default: {},
});



const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="SelectBill" component={SelectBillScreen} />
      <HomeStack.Screen name="InsertBillDetail" component={InsertBillDetailScreen} />
      <HomeStack.Screen name="AddAmount" component={AddAmountScreen} />
      <HomeStack.Screen name="SelectBank" component={SelectBankScreen} />

    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator tabBarOptions={{ inactiveTintColor: 'rgba(277,277,277,.4)', activeTintColor: 'white', style: { backgroundColor: Colors.bottomBar } }}>
      <Tab.Screen name="Home" component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Invoice" component={InvoiceScreen}
        options={{
          tabBarLabel: 'Invoice',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="file-invoice-dollar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen name="Settings" component={SettingScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


const Main = createStackNavigator();

export default function MainStack() {
  return (
    <NavigationContainer>
      <Main.Navigator headerMode="none">
        <Main.Screen name="BottomTab" component={TabNavigator} />
        <Main.Screen name="Payment" component={PaymentScreen} />
      </Main.Navigator>
    </NavigationContainer>
  );
}


