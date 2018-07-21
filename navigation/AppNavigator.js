import React from 'react';
import { ActivityIndicator, AsyncStorage, Button, StatusBar, StyleSheet, View } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import Home from '../screens/Home';
import PriorityForm from '../screens/PriorityForm';
import Decisions from '../screens/Decisions';
import Settings from '../screens/Settings';
import AuthLoading from '../screens/AuthLoading';
import SignIn from '../screens/SignIn';

import { Icon } from 'react-native-elements';

const AppStack = createStackNavigator({ Home, Settings, PriorityForm });
const DecisionsStack = createStackNavigator({ Decisions });
const AuthStack = createStackNavigator({ SignIn });

DecisionsStack.navigationOptions = {
  tabBarLabel: 'Decisions',
  tabBarIcon: ({ focused }) => <Icon name="directions-run" type="material" />
};

AppStack.navigationOptions = {
  tabBarLabel: 'Priorities',
  tabBarIcon: ({ focused }) => <Icon name="layers" type="material" />
};

const Main = createBottomTabNavigator({
  AppStack,
  DecisionsStack
});

export default createSwitchNavigator(
  {
    AuthLoading,
    App: Main,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
);
