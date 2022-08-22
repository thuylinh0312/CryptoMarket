import React , {useEffect, useState, useRef} from 'react'
import {View, Text, Animated} from 'react-native'

const FeedScreen = () => {
  const transform = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const anim1 = Animated.timing(
      transform,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }
    );
    const anim2 = Animated.timing(
      transform,
      {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      }
    );

    const finalAnim = Animated.sequence([anim1, anim2]);
    Animated.loop(finalAnim).start();
  }, []) 
  const rotate = transform.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['15deg', '0deg', '-15deg']
  });
  // const width = transform.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [200, 300]
  // });
  return (
    <View style={{flex: 1}}>
      <Text>Feed Screen</Text>  
      <Animated.View
        style={{
          width : 200, height: 200, marginBottom: 30,backgroundColor: 'green',
          transform: [{ rotate }, { rotateY: rotate}],
          opacity: transform,
        }}
      />

    </View>
  )
}

export default FeedScreen
