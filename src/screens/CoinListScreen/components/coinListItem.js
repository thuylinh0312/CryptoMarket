import React from 'react'
import {View, Image, Text, StyleSheet} from 'react-native'
import { images } from '../../../../assets/images'
import { SvgCssUri } from 'react-native-svg';

export const CoinListItem = ({item}) => {
  return (
    <View style = {styles.container}>
      <Image 
        style={styles.image}
        source={{uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png?_=5bcdbc6`}}
      />
      <View style={{width:"33%"}}>
        <View style = {{flexDirection: "row", width:"100%"}}>
          <Text style={{fontSize: 10 , fontWeight:"bold",width:"60%" }}>{item.name}</Text>
          <View style={{ marginVertical: -14}}>
          <SvgCssUri
            width="60"
            // height="40"
            uri={`https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${item.id}.svg`}
            />
          </View>
         
        
        </View>
        

        
        
        <View style = {{flexDirection: "row"}}>
          <View style={styles.rank}>
            <Text style={{fontSize: 7, fontWeight:"bold"}}>{item.cmc_rank}</Text>
          </View>
          <View style={styles.symbol}>
            <Text style={{fontSize: 7 }}>{item.symbol}</Text>
          </View>
          

          <View style = {styles.day}>
            {item.quote.USD.percent_change_24h > 0 ?  <Image style = {styles.icon_up} source={images.up}/> : <Image style = {styles.icon_down} source={images.down}/>}
            <Text style = {styles.percent_change}>{Math.abs(item.quote.USD.percent_change_24h).toFixed(2)}%</Text>
          </View>
        </View>

        
      </View>

      {/* <View >
      <SvgCssUri
            width="70"
            
            uri={`https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${item.id}.svg`}
            />
      </View> */}
      
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
    day: {
        flexDirection: "row", 
        alignItems: "center",
    },
    week: {
        flexDirection: "row", 
        alignItems: "center",
        flex: 1, 
        justifyContent: 'flex-start'
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