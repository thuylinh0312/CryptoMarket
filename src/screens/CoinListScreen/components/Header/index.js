import React from 'react'
import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import { images } from '../../../../../assets/images';
import {useSelector, useDispatch} from 'react-redux'

export const Header = ({navigation}) => {
  const user = auth().currentUser
  const url = useSelector(state => {
    return state.updateProfile.url
  })
  return (
    <View style = {styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        {user.photoURL === null ?  <Image style = {styles.img} source={images.acc}/>
        :  url === "" ? <Image  source={{uri: user.photoURL}} style={styles.img}/>
        : <Image  source={{uri: url}} style={styles.img}/>
        }
      </TouchableOpacity>
      <Text style = {styles.text}>Cryptoassets</Text>
      <TouchableOpacity  onPress={() => navigation.navigate("SearchScreen")}>
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
      marginTop: 15,
      marginHorizontal: 20
    },
    text: {
      fontSize: 15,
      fontWeight: "bold"
    },
    img: {
      width: 40,
      height: 40,
      borderRadius: 50
    },
  });


