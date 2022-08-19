import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreScreen from '../../screens/ExploreScreen';
import CoinListScreen from '../../screens/CoinListScreen';
import PortfolioScreen from '../../screens/PortfolioScreen';
import FeedScreen from '../../screens/FeedScreen';
import Icon from 'react-native-vector-icons/AntDesign';


const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName = "CoinList"
      screenOptions = {{
        tabBarShowLabel: true,
        tabBarActiveTintColor: 'blue',
      }}
      
    >
      
      <Tab.Screen
        name="CoinList"
        component={CoinListScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'CoinList',
          tabBarIcon: ({ focused }) => (
            <Icon name="barschart" size={30} color={focused ? "blue" : "gray"}/>
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Explore',
          tabBarIcon: ({ focused}) => (
            <Icon name="search1" size={30} color={focused ? "blue" : "gray"}/>
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
            <Icon name="piechart" size={30} color={focused ? "blue" : "gray"}/>
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
            <Icon name="wechat" size={30} color={focused ? "blue" : "gray"}/>
          ),
        }}
      />
      
    </Tab.Navigator>
  );
}
