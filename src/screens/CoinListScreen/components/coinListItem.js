import React, { useMemo } from 'react'
import {View, Image, Text, StyleSheet} from 'react-native'
import { images } from '../../../../assets/images'
import { SvgCssUri } from 'react-native-svg';
import {useSelector, useDispatch} from 'react-redux'

export const CoinListItem = ({item}) => {

  const DATA = useSelector(state => {
    return state.coinListOption.DATA
  })

  // let percent;
  const percent = useMemo(()=>{
    switch(DATA[3].title){
      case "%(24h)":
        return item.quote.USD.percent_change_24h 
      case "%(1h)":
        return item.quote.USD.percent_change_1h 
      case "%(7d)":
        return item.quote.USD.percent_change_7d
    }
  },[])
  // if(DATA[3].title === "%(24h)"){
  //   percent = item.quote.USD.percent_change_24h 
  // }else {
  //   if(DATA[3].title === "%(1h)"){
  //     percent = item.quote.USD.percent_change_1h 
  //   }else {
  //     percent = item.quote.USD.percent_change_7d 
  //   }
  // }
  return (
    <View style = {styles.container}>
      <Image 
        style={styles.image}
        source={{uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png?_=5bcdbc6`}}
      />
      <View style={{flex: 1, backgroundColor: "red"}}>
        <View style = {{flexDirection: "row", width:"100%", flex: 1, width: "100%", justifyContent:"space-between", backgroundColor:"yellow"}}>
          <Text style={{fontSize: 10 , fontWeight:"bold",width:"30%" , backgroundColor: "white"}}>{item.name}</Text>
          <View style={{ marginVertical: -13}}>
            <SvgCssUri
              width="60"
              uri={`https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${item.id}.svg`}
              />
          </View>



          {/* <View style = {{flex: 1}}></View> */}
          <View style = {{textAlign:'right'}}>
            <Text style={{fontSize: 9, fontWeight:"bold"}}>${item.quote.USD.price.toFixed(2)}</Text>
          </View>
          
        </View>

        <View style = {{flexDirection: "row"}}>
          <View style={styles.rank}>
            <Text style={{fontSize: 7, fontWeight:"bold"}}>{item.cmc_rank}</Text>
          </View>
          <View style={styles.symbol}>
            <Text style={{fontSize: 7 }}>{item.symbol}</Text>
          </View>
          

          <View style = {styles.percent}>
            {percent > 0 ?  <Image style = {styles.icon_up} source={images.up}/> : <Image style = {styles.icon_down} source={images.down}/>}
            <Text style = {styles.percent_change}>{Math.abs(percent).toFixed(2)}%</Text>
          </View>
        </View>

        
      </View>
      
    </View> 
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        marginBottom: 5,
        paddingHorizontal: 15
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
        // minHeight: 14,
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
    percent_change: {
        fontSize: 8 , 
       
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