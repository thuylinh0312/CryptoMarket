import React from 'react'
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { setId } from '../../../actions/coinListAction'
import {useSelector, useDispatch} from 'react-redux'


export const CoinListSeach = ({item, navigation}) => {
  const dispatch = useDispatch() 
  return (
    <View style = {styles.container}>
      <Image 
        style={styles.image}
        source={{uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png?_=5bcdbc6`}}
      />
      <TouchableOpacity onPress={() => {
          dispatch(setId(item.id))
          navigation.navigate("OverviewScreen")
      }}>
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
      
    </View> 
  )
}
const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        marginBottom: 5,
        paddingHorizontal: 10,
    },
    name:{
        fontSize: 13 , 
        fontWeight:"bold",
        marginRight: 15
    },
    image: {
        width: 35, 
        height: 35, 
        marginRight: 15
    },
    
})