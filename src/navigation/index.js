import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import SearchScreen from '../screens/SearchScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import AccountScreen from '../screens/AccountScreen';
import PassScreen from '../screens/AccountScreen/PassScreen';
import EmailScreen from '../screens/AccountScreen/EmailScreen';
import LoadingScreen from '../screens/LoadingScreen';
import SettingScreen from '../screens/SettingScreen';
import { Tabs } from './tabbottom';
import DrawerComponent from './drawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export const AppNavigation = () => {
  const DrawerScreen = () => {
    return (
      <Drawer.Navigator 
        drawerContent={props => <DrawerComponent  {...props}/>} 
        initialRouteName="Tabs" 
        screenOptions = {{headerShown: false}}>

        <Drawer.Screen  name='Tabs' component={Tabs}/>
      </Drawer.Navigator>
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoadingScreen" screenOptions = {{headerShown: false}}>
        <Stack.Screen  name='SearchScreen' component={SearchScreen} />
        <Stack.Screen  name='LoginScreen' component={LoginScreen} />
        <Stack.Screen  name='SignupScreen' component={SignupScreen} />
        <Stack.Screen  name='AccountScreen' component={AccountScreen} />
        <Stack.Screen  name='PassScreen' component={PassScreen} />
        <Stack.Screen  name='EmailScreen' component={EmailScreen} />
        <Stack.Screen  name='LoadingScreen' component={LoadingScreen} />
        <Stack.Screen  name='SettingScreen' component={SettingScreen} />
        <Stack.Screen  name='DrawerScreen' component={DrawerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}