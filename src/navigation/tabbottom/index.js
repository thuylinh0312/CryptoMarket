import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import CoinListScreen from '../../screens/CoinListScreen';
import PortfolioScreen from '../../screens/PortfolioScreen';
import FeedScreen from '../../screens/FeedScreen';
import SettingScreen from '../../screens/SettingScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

// import { MaterialCommunityIcons } from '@expo/vector-icons';


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
          tabBarIcon: ({ color, size }) => (
            <Icon name="book" size={30} color="#900" />
            // <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="CoinList"
        component={CoinListScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'CoinList',
        //   tabBarIcon: ({ color, size }) => (
        //     <MaterialCommunityIcons name="home" color={color} size={size} />
        //   ),
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Portfolio',
        //   tabBarIcon: ({ color, size }) => (
        //     <MaterialCommunityIcons name="home" color={color} size={size} />
        //   ),
        }}
      />
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Feed',
        //   tabBarIcon: ({ color, size }) => (
        //     <MaterialCommunityIcons name="home" color={color} size={size} />
        //   ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Setting',
        //   tabBarIcon: ({ color, size }) => (
        //     <MaterialCommunityIcons name="home" color={color} size={size} />
        //   ),
        }}
      />
      
    </Tab.Navigator>
  );
}



// export default function App() {
//   return (
//     <NavigationContainer>
//       <MyTabs />
//     </NavigationContainer>
//   );
// }
