import React from 'react'
import {View, Text} from 'react-native'
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

// const Tab = createMaterialBottomTabNavigator();

const HomeScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Text>Home Screen</Text>
    </View>
    /*
      <Tab.Navigator>
        <Tab.Screen name="CoinListScreen" component={CoinListScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    */
  )
}

export default HomeScreen