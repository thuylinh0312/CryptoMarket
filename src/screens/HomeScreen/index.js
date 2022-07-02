import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';

const HomeScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <Text >Home Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")}>
        <Icon name="search1" size={25} color={ "black"}/>
      </TouchableOpacity>
      
    </View>
  )
}

export default HomeScreen