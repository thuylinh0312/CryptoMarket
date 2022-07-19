import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import auth, { firebase } from '@react-native-firebase/auth';

const PassScreen = ({navigation}) => {
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const createAlert = () =>
        Alert.alert(
            "Lỗi!",
            `Vui lòng kiểm tra thông tin`,
    );

    const reauthenticate = (currentPassword) => {
        const user = firebase.auth().currentUser;
        let cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }
    const changePass = () => {
        if(newPass === confirmPass){
            reauthenticate(currentPassword).then(() => {
            const user = firebase.auth().currentUser;
            user.updatePassword(newPass).then(() => {
                alert("Thay đổi mật khẩu thành công!")
                setCurrentPassword("")
                setNewPass("")
                setConfirmPass("")
            }).catch((error) => {
                createAlert()
            })
            }).catch((error) => {
                createAlert()
            })
        }else{
            createAlert()
        }   
    }

    return (
    <View style={styles.container}>
        <View  style = {{flex: 1}}>
            <View style = {styles.title}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrowleft" size={30} color={ "black"}/>
                </TouchableOpacity>
                <Text style = {styles.texttt}>Change password</Text>
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
                <Text style = {styles.text}> New Password</Text>
                <View style = {styles.pass}>
                    <TextInput
                    value={newPass}
                    onChangeText={text => setNewPass(text)}
                    placeholder = "Enter your new password..."
                    secureTextEntry
                    />
                </View>
                <Text style = {styles.text}> Confirm New Password</Text>
                <View style = {styles.pass}>
                    <TextInput
                    value={confirmPass}
                    onChangeText={text => setConfirmPass(text)}
                    placeholder = "Repeat your new password..."
                    secureTextEntry
                    />                 
                </View>
            </View>
            
        </View>

        <View style = {styles.updatePass}>
            <TouchableOpacity onPress={() => changePass() }>
                <Text style = {{ fontWeight: "bold"}}>Update password</Text>
            </TouchableOpacity>
        </View> 
    </View>
  )
}

export default PassScreen
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
    updatePass: {
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
