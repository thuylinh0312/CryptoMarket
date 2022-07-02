import React from 'react'
import {View, Image, Text, StyleSheet} from 'react-native'


export const CoinListSeach = ({item}) => {

  return (
    <View style = {styles.container}>
      <Image 
        style={styles.image}
        source={{uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png?_=5bcdbc6`}}
      />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.symbol}>{item.symbol}</Text>
      
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
    symbol:{
        fontSize: 9 , 
        color: "gray"
    },
    
})