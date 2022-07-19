import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { images } from '../../../assets/images';
import auth from '@react-native-firebase/auth';
import { DrawerContentScrollView } from '@react-navigation/drawer';

const DrawerComponent = (props) => {
    const [display, setDisplay] = useState(false)
    const logOutPress = () => {
        auth().signOut().then(() => console.log('User signed out!'));
        props.navigation.navigate("LoginScreen")
    }
    return (
    <View style = {styles.container}>
        <DrawerContentScrollView {...props}>
            <View style = {styles.acc}>
                <TouchableOpacity onPress={() => props.navigation.navigate("AccountScreen")}>
                    <Image style = {styles.img} source={images.acc}/>
                </TouchableOpacity>
                <Text style = {styles.textAcc}>Hi, {auth().currentUser.displayName}</Text>
            </View>
            <View style = {styles.title}>
                <Icon name="tool" size={23} color={ "black"}/>
                <TouchableOpacity >
                    <Text style = {styles.textTT}>Tools</Text>
                </TouchableOpacity>
                <View style = {{flex: 1}}></View>
                <TouchableOpacity onPress={() => setDisplay(!display)}>
                    <Icon name={!display ? "down" : "up"} size={17} color={ "black"}/>
                </TouchableOpacity>
            </View>
            {!display ? null : 
            <View style = {styles.tools}>
                <TouchableOpacity > 
                    <Text style = {styles.tool}>Price Alert</Text>
                </TouchableOpacity>
                
                <TouchableOpacity >
                    <Text style = {styles.tool}>Converter</Text>
                </TouchableOpacity>
            
                <TouchableOpacity >
                    <Text style = {styles.tool}>Compare</Text>
                </TouchableOpacity>
            
            </View>
            }
            
            <View style = {styles.title}>
                <Icon name="setting" size={23} color={ "black"}/>
                <TouchableOpacity onPress={() => props.navigation.navigate("SettingScreen")}>
                    <Text style = {styles.textTT}>Settings</Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.title}>
                <Icon name="logout" size={23} color={ "black"}/>
                <TouchableOpacity onPress={() => logOutPress()}>
                    <Text style = {styles.textTT}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
        
    </View>
  )
}

export default DrawerComponent
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    acc: {
        alignItems:"center",
        justifyContent: "center",
        marginVertical: 15,
    },
    textAcc: {
        fontSize: 15,
        fontWeight: "bold",
        marginVertical: 10,
    },
    tools: {
        marginLeft: 30,
        marginVertical: 10,
    },
    tool: {
        fontSize: 11,
        marginBottom: 8,
    },
    img: {
        width: 60,
        height: 60,
        borderRadius: 50
    },
    title: {
        flexDirection: "row", 
        alignItems: "center",
        marginBottom: 15
    },
    textTT: {
        fontSize: 11,
        fontWeight: "bold",
        marginLeft: 9
    }
  });