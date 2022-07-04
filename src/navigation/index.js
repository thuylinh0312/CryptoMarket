import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import SearchScreen from '../screens/SearchScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import { Tabs } from './tabbottom';

const Stack = createNativeStackNavigator();

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen options={{headerShown: false}} name='Tabs' component={Tabs}/>
        <Stack.Screen options={{headerShown: false}} name='SearchScreen' component={SearchScreen} />
        <Stack.Screen options={{headerShown: false}} name='LoginScreen' component={LoginScreen} />
        <Stack.Screen options={{headerShown: false}} name='SignupScreen' component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}