import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Decisions from '../screens/Decisions';
import SettingsScreen from '../screens/SettingsScreen';
import PriorityForm from '../screens/PriorityForm';
import SignIn from '../screens/SignIn';

import TabBarIcon from '../components/TabBarIcon';

const headerStyle = {
  marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
};

export const AuthStack = createStackNavigator({
  SignUp,
  SignIn
});

const HomeStack = createStackNavigator({
  Home,
  PriorityForm
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios' ? `ios-information-circle${focused ? '' : '-outline'}` : 'md-information-circle'
      }
    />
  )
};

const DecisionsStack = createStackNavigator({
  Decisions
});

DecisionsStack.navigationOptions = {
  tabBarLabel: 'Decisions',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  DecisionsStack,
  SettingsStack
});
