import React from 'react'
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { images } from '../../../assets/images';


const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style = {styles.title}>
        <TouchableOpacity  onPress={() => navigation.openDrawer()}>
          <Image style = {styles.img} source={images.acc}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")}>
          <Icon name="search1" size={25} color={ "black"}/>
        </TouchableOpacity>
      </View>
   
      <Text>Home Screen</Text>
     
    </View>
  )
}

export default HomeScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 50
  },
  title: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center"
  },
});
