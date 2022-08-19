import React from 'react'
import {View, Text, StyleSheet, Linking, TouchableOpacity} from 'react-native'
const WEB_URL = "https://tiki.vn/"

const PortfolioScreen = () => {
  const openLink = () => {
    Linking.canOpenURL(WEB_URL).then((supported) => {
      supported && Linking.openURL(WEB_URL);
    })
  }
  return (
    <View style = {{flex: 1}}>
      <TouchableOpacity onPress={() => openLink() }>
        <Text>Portfolio Screen</Text>
      </TouchableOpacity>
      
      
    </View>
    

  )
}

export default PortfolioScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    flex: 1
  }
});