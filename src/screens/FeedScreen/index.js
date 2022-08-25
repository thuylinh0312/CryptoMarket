import React  from 'react'
import {View, Text, StyleSheet} from 'react-native'

const FeedScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Feed Screen</Text>  
    </View>
  )
}

export default FeedScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
});