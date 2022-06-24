import React from 'react'
import {View, Text} from 'react-native'
import { SvgCssUri } from 'react-native-svg';

const SettingScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Text>Setting</Text>
      <SvgCssUri
    fill="black"
    color={"black"}
    width="100%"
    height="100%"
    uri="https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/1.svg"
    />
    </View>
  )
}

export default SettingScreen