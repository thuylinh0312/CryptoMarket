import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView} from 'react-native'
import auth, { firebase } from '@react-native-firebase/auth';

const EmailScreen = ({navigation}) => {
    const [newEmail, setNewEmail] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const createAlert = () =>
        Alert.alert(
            "Lỗi!",
            `Vui lòng kiểm tra thông tin`,
    );

    const reauthenticate = (currentPassword) => {
        let user = firebase.auth().currentUser;
        let cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }
    const changeEmail = () => {
        reauthenticate(currentPassword).then(() => {
        let user = firebase.auth().currentUser;
        user.updateEmail(newEmail).then(() => {
            alert("Thay đổi email thành công!")
            setCurrentPassword("")
            setNewEmail("")
        }).catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert(
                    "Lỗi!",
                    `Địa chỉ email này đã được sử dụng`,
                );
            }else{
                createAlert()
            }
           
        })
        }).catch((error) => {
            createAlert()
        })       
    }

    return (
    <View style={styles.container}>
        <View  style = {{flex: 1}}>
            <View style = {styles.title}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrowleft" size={30} color={ "black"}/>
                </TouchableOpacity>
                <Text style = {styles.texttt}>Change email address</Text>
            </View>
            <View>
                <Text style = {styles.text}> Current Password</Text>
                <View style = {styles.pass}>
                    <TextInput
                    value={currentPassword}
                    onChangeText={text => setCurrentPassword(text)}
                    placeholder = "Enter your current password..."
                    secureTextEntry
                    />
                    
                </View>
                <Text style = {styles.text}> New Email Address</Text>
                <View style = {styles.pass}>
                    <TextInput
                    value={newEmail}
                    onChangeText={text => setNewEmail(text)}
                    placeholder = "Enter your new email address..."
                    />
                </View>
            </View>
            
        </View>

        <View style = {styles.updateEmail}>
            <TouchableOpacity onPress={() => changeEmail() }>
                <Text style = {{ fontWeight: "bold"}}>Change email address</Text>
            </TouchableOpacity>
        </View> 
    </View>
  )
}

export default EmailScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    title: {
        flexDirection: "row", 
        alignItems: "center",
        marginBottom: 20
    },
    texttt: {
        marginLeft: 10, 
        fontWeight: "bold"
    },
    pass: {
        flexDirection: "row",
        borderColor: "gray", 
        borderWidth: 1, 
        marginTop: 8, 
        marginBottom: 25,
        borderRadius: 10, 
        paddingHorizontal:5,
    },
    updateEmail: {
        backgroundColor: "lightgray",
        borderColor: "gray", 
        borderWidth: 1,  
        marginBottom: 5,
        borderRadius: 10, 
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        
    },
    text: {
        fontSize: 12,
        fontWeight: "bold"
    }
});
