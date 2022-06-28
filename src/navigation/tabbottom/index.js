import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import CoinListScreen from '../../screens/CoinListScreen';
import PortfolioScreen from '../../screens/PortfolioScreen';
import FeedScreen from '../../screens/FeedScreen';
import SettingScreen from '../../screens/SettingScreen';
import Icon from 'react-native-vector-icons/AntDesign';


const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="CoinList"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused}) => (
            <Icon name="home" size={30} color={focused ? "blue" : "black"} />
          ),
        }}
      />
      <Tab.Screen
        name="CoinList"
        component={CoinListScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'CoinList',
          tabBarIcon: ({ focused }) => (
            <Icon name="barschart" size={30} color={focused ? "blue" : "black"}/>
          ),
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Portfolio',
          tabBarIcon: ({ focused}) => (
            <Icon name="piechart" size={30} color={focused ? "blue" : "black"}/>
          ),
        }}
      />
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Feed',
          tabBarIcon: ({ focused }) => (
            <Icon name="wechat" size={30} color={focused ? "blue" : "black"}/>
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Setting',
          tabBarIcon: ({ focused }) => (
            <Icon name="user" size={30} color={focused ? "blue" : "black"}/>
          ),
        }}
      />
      
    </Tab.Navigator>
  );
}
