import auth from '@react-native-firebase/auth';
import React from 'react'
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { images } from '../../../assets/images';
// import { DrawerActions } from 'react-navigation';

const HomeScreen = ({navigation}) => {
  const logOutPress = () => {
    auth().signOut().then(() => console.log('User signed out!'));
    navigation.navigate("LoginScreen")
  }
  return (
    <View style={styles.container}>
      <View style = {styles.title}>
        <TouchableOpacity onPress={() => navigation.navigate("AccountScreen")}>
          <Image style = {styles.img} source={images.acc}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")}>
          <Icon name="search1" size={25} color={ "black"}/>
        </TouchableOpacity>
      </View>
      {/* <Text onPress={() => navigation.navigate("DrawerScreen")}> setting</Text> */}
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Text>open drawer</Text>
      </TouchableOpacity>

      <View style = {{flex:1}}></View>
      <View style = {styles.logOut}>
        <Icon name="logout" size={25} color={ "black"}/>
        <TouchableOpacity onPress={() => logOutPress()}>
          <Text style = {styles.textLogOut}>Log Out</Text>
        </TouchableOpacity>
      </View>
     
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
  logOut: {
    flexDirection: "row", 
    alignItems: "center"
  },
  textLogOut: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 7
  }
});
