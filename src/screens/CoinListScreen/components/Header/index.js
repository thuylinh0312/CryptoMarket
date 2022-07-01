import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';

export const Header = ({navigation}) => {
  return (
    <View style = {styles.container}>
      <TouchableOpacity>
        <Text style = {styles.text}>Cryptoassets</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style = {styles.text}>Exchanges</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style = {styles.text}>Sectors</Text>
      </TouchableOpacity>
      <TouchableOpacity  
      onPress={() => navigation.navigate("SearchScreen")}
      >
        <Icon name="search1" size={25} color={ "black"}/>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between", 
        alignItems:"center", 
        margin: 10,
        marginTop: 15
    },
    text: {
        fontSize: 12,
        fontWeight: "bold"
    }
  });


