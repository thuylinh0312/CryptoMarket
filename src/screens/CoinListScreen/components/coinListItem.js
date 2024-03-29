import React, { useMemo, useEffect } from 'react'
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { images } from '../../../../assets/images'
import { SvgUri } from 'react-native-svg';
import {useSelector, useDispatch} from 'react-redux'
import Icon from 'react-native-vector-icons/AntDesign';
import { setId } from '../../../actions/coinListAction';


export const CoinListItem = ({navigation, item, onFavourite}) => {
  const dispatch = useDispatch() 
  const DATA = useSelector(state => {
    return state.coinListOption.data
  })
  const favoriteList = useSelector(state => {
    return state.favoriteList.favorite
  })
  const price = useMemo(() => {
    switch(DATA[0].title){
      case "USD":
        return item.quote.USD.price.toFixed(2)
      case "BTC":
        return item.quote.BTC.price.toFixed(8)
    }
  },[DATA[0].title])
  const percent = useMemo(()=>{
    if (DATA[0].title === "USD"){
      switch(DATA[2].title){
        case "%(24h)":
          return item.quote.USD.percent_change_24h 
        case "%(1h)":
          return item.quote.USD.percent_change_1h 
        case "%(7d)":
          return item.quote.USD.percent_change_7d
      }
    }else{
        switch(DATA[2].title){
        case "%(24h)":
          return item.quote.BTC.percent_change_24h 
        case "%(1h)":
          return item.quote.BTC.percent_change_1h 
        case "%(7d)":
          return item.quote.BTC.percent_change_7d
      }
    }
   
  },[DATA[2].title, DATA[0].title])

  return (
    <View style = {styles.container}>
      <TouchableOpacity onPress={() => {
        dispatch(setId(item.id))
        navigation.navigate("OverviewScreen")
      }}>
        <Image 
        style={styles.image}
        source={{uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png?_=5bcdbc6`}}
      />
      </TouchableOpacity>
      
      <View style={{flex: 1}}>
        <View style = {styles.row1}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={{ marginVertical: -13}}>
            <SvgUri
              width="60"
              uri={`https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${item.id}.svg`}
              />
          </View>

          <View style = {{textAlign:'right'}}>
            <Text style={styles.price}>
              {DATA[0].title === "USD" ? "$" : "" }{price}
            </Text>
          </View>
          
        </View>

        <View style = {{flexDirection: "row"}}>
          <View style={styles.rank}>
            <Text style={styles.row2}>{item.cmc_rank}</Text>
          </View>
          <View style={styles.symbol}>
            <Text style={styles.row2}>{item.symbol}</Text>
          </View>
          

          <View style = {styles.percent}>
            {percent > 0 ?  <Image style = {styles.icon_up} source={images.up}/> : <Image style = {styles.icon_down} source={images.down}/>}
            <Text style = {styles.row2}>{Math.abs(percent).toFixed(2)}%</Text>
          </View>
        </View> 
      </View>
      <TouchableOpacity onPress={onFavourite}>
        <Icon style={{marginLeft:12}} name={favoriteList.includes(item.id) ? "star" : "staro"} size={15} color="gray"/>
      </TouchableOpacity>
      
    </View> 
  )
}

const styles = StyleSheet.create({
    container:{
      flexDirection: "row",
      marginBottom: 5,
      paddingHorizontal: 15,
      alignItems: "center",
      justifyContent: "center"
    },
    name:{
      fontSize: 10 , 
      fontWeight:"bold",
      width:"30%"
    },
    image: {
      width: 35, 
      height: 35, 
      marginRight: 15
    },
    symbol:{
      justifyContent: 'center', 
      alignItems: 'center', 
    },
    rank:{
      minWidth: 14, 
      borderRadius: 7,
      paddingHorizontal: 2,
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: "lightgray"  
    },
    percent: {
      flexDirection: "row", 
      alignItems: "center",
    },
    row1: {
      flexDirection: "row", 
      flex: 1, 
      width: "100%", 
      justifyContent:"space-between"
    },
    row2: {
      fontSize: 7 , 
      fontWeight:"bold"  
    },
    price: {
      fontSize: 9 , 
      fontWeight:"bold"  
    },
    icon_up:{
      width:20, 
      height:20,
      tintColor: 'blue'
    },
    icon_down:{
      width:20, 
      height:20,
      tintColor: 'red'
    }
})