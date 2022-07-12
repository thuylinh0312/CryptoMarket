import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'


const SettingScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <Text>Setting</Text>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Text>open drawer</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Back</Text>
      </TouchableOpacity>
      
      
    </View>
  )
}

export default SettingScreen