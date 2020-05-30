import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SelectBillScreen from '../screens/SelectBillScreen';
import InsertBillDetailScreen from '../screens/InsertBillDetailScreen';
import AddAmountScreen from '../screens/AddAmountScreen'
import SuccessScreen from '../screens/SuccessScreen';
import SelectBankScreen from '../screens/SelectBankScreen';
import Colors from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons';
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

    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function MainStack() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={{ inactiveTintColor: 'rgba(277,277,277,.4)', activeTintColor: 'white', style: { backgroundColor: Colors.bottomBar } }}>
        <Tab.Screen name="Home" component={HomeStackScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen name="Settings" component={SelectBillScreen}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-home" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


