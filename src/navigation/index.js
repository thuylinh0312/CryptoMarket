import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen';
import { Tabs } from './tabbottom';

const Stack = createNativeStackNavigator();

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tabs">
        <Stack.Screen options={{headerShown: false}} name='Tabs' component={Tabs}/>
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}