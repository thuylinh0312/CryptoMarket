import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native'
import auth from '@react-native-firebase/auth';
import { images } from '../../../assets/images';

const AccountScreen = ({navigation}) => {
    const user = auth().currentUser
    const [display, setDisplay] = useState(false)
    const [displayName, setDisplayName] = useState("")
    const [name, setName] = useState(user.displayName === null ? user.email.split("@")[0] : user.displayName)
    const updateName =() => {
        user.updateProfile({displayName: displayName})
        setName(displayName)
        setDisplay(!display)
        setDisplayName("")
    }
    return (
    <View style={styles.container}>
        <View style = {styles.title}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrowleft" size={30} color={ "black"}/>
            </TouchableOpacity>
            <Text style = {styles.text}>Account Settings</Text>
        </View>
        <ScrollView>
            <View style = {styles.content}>
                <Text style = {{fontSize: 11}}>Avatar</Text>
                <View style = {{flex: 1}}></View>
                <Image style = {styles.img} source={images.acc}/>
                <TouchableOpacity>
                    <Text style = {styles.icon}>{`>`}</Text>
                </TouchableOpacity>
            </View>

            <View style = {styles.content}>
                <Text style = {{fontSize: 11}}>Email address</Text>
                <View style = {{flex: 1}}></View>
                <Text style = {{fontSize: 11}}>{user.email}</Text>
                <TouchableOpacity onPress={() => navigation.navigate("EmailScreen")}>
                    <Text style = {styles.icon}>{`>`}</Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.content}>
                <Text style = {{fontSize: 11}}>Display name</Text>
                <View style = {{flex: 1}}></View>
                <Text style = {{fontSize: 11}}>{name}</Text>
                <TouchableOpacity onPress={() => setDisplay(!display)}>
                    <Text style = {styles.icon}>{`>`}</Text>
                </TouchableOpacity>
            </View>

            {!display ? null : 
            <View>
                <View style = {styles.pass}>
                <TextInput
                    style ={styles.input}
                    value={displayName}
                    onChangeText={text => setDisplayName(text)}
                    placeholder = "Enter your display name..."
                />
                <TouchableOpacity onPress={() => updateName()}>
                    <Text style = {styles.change}>Change</Text>
                </TouchableOpacity>
                        
                </View>
            </View>
            }
             
            <View style = {styles.content}>
                <Text style = {{fontSize: 11}}>Change password</Text>
                <View style = {{flex: 1}}></View>
                <TouchableOpacity onPress={() => navigation.navigate("PassScreen")}>
                    <Text style = {styles.icon}>{`>`}</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>       
    </View>
  )
}

export default AccountScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    img: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginRight: 10
    },
    title: {
        flexDirection: "row", 
        alignItems: "center",
        marginBottom: 20
    },
    content: {
        flexDirection: "row", 
        alignItems: "center",
        marginBottom: 10
    },
    text: {
        marginLeft: 10, 
        fontWeight: "bold"
    },
    icon: {
        fontSize: 18, 
        marginLeft: 7,
    },
    change: {
        fontSize: 10,
        fontWeight: "bold", 
        marginRight: 5
    },
    pass: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        borderColor: "gray", 
        borderWidth: 1, 
        marginBottom: 8,
        borderRadius: 7, 
        paddingHorizontal: 5,
    },
    input: {
        fontSize: 10, 
        padding: 8
    }
});
