import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'


const PortfolioScreen = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
 

  const panGestureEvent = useAnimatedGestureHandler
  ({
    onStart: (event) => {
 
    },
    onActive: (event) => {
      translateX.value = event.translationX 
      translateY.value = event.translationY 
    },
    onEnd: () => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    },
  });
  const AniStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ]
    }
  })
  return (
    <View style = {styles.container}>
      {/* <Text>Portfolio Screen</Text> */}
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style = {[styles.square, AniStyle]}/>
      </PanGestureHandler>
      
      
      
    </View>
    

  )
}

export default PortfolioScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: "center",
    justifyContent: "center"
  },
  square: {
    width: 70,
    height: 70,
    backgroundColor: "red",
    borderRadius: 15
  }
});