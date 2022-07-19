import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView} from 'react-native'
import auth from '@react-native-firebase/auth';

const SignupScreen = ({navigation}) => {
    const [display, setDisplay] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const createAlert = () =>
        Alert.alert(
        "Đăng kí thành công!",
        `Tài khoản ${email}`,
        [
            {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
            },
            { text: "Log In", onPress: () => navigation.navigate("LoginScreen") }
        ]
    );

    const handleSignUp = () => {
        if( email === "" || password === ""){
            alert("Vui lòng nhập đầy đủ thông tin!")
        }else{
            auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                setEmail("")
                setPassword("")
                createAlert()
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert(
                        "Đăng kí thất bại!",
                        `Tài khoản ${email} đã được sử dụng`,
                    );
                }

                if (error.code === 'auth/invalid-email') {
                    Alert.alert(
                        "Đăng kí thất bại!",
                        `Tài khoản không hợp lệ`,
                    );
                }

                console.error(error);
            });
        }
        
    }

    return (
    <View style={styles.container}>
        <View  style = {{flex: 1}}>
            <Text style = {styles.textSignup}>Sign Up</Text>

                <View>
                <Text>Email Address</Text>
                <View style = {styles.email}>
                    <TextInput
                    value={email}
                    onChangeText={text => setEmail(text)}
                    placeholder = "Enter your email address..."
                    />
                </View>
                <Text>Password</Text>
                <View style = {styles.pass}>
                    <TextInput
                    style = {{flex: 1}}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    placeholder = "Enter your password..."
                    secureTextEntry={display}
                    />
                    <TouchableOpacity onPress={() => setDisplay(!display)}>
                        <Icon style={{marginRight: 8}} name={display ? "eye-slash" : "eye"} size={18} color="lightgray"/>
                    </TouchableOpacity>
                    
                </View>
                </View>
            
            <View style = {styles.text}>
                <Text style = {{fontSize: 10}}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
                    <Text style = {styles.textLogin}>Log In</Text>
                </TouchableOpacity>
            
            
            </View>
        </View>
        

        <View style = {styles.createAcc}>
            <TouchableOpacity  onPress={() => handleSignUp() }>
                <Text>Create an Account</Text>
            </TouchableOpacity>
            
        </View>

        
        
    </View>
  )
}

export default SignupScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        backgroundColor: "yellow"
    },
    textSignup: {
        marginTop: 5, 
        marginBottom: 30, 
        fontSize: 20, 
        fontWeight: "bold"
    },
    email: {
        borderColor: "gray", 
        borderWidth: 1, 
        marginTop: 8, 
        marginBottom: 25,
        borderRadius: 10, 
        paddingHorizontal:7
    },
    pass: {
        flexDirection: "row",
        borderColor: "gray", 
        borderWidth: 1, 
        marginTop: 8, 
        marginBottom: 25,
        borderRadius: 10, 
        paddingHorizontal:7,
        justifyContent: "center",
        alignItems: "center"
    },
    createAcc: {
        backgroundColor: "red",
        borderColor: "gray", 
        borderWidth: 1,  
        marginBottom: 5,
        borderRadius: 10, 
        padding: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        flexDirection: "row", 
        marginTop: 10, 
        justifyContent: "center"
    },
    textLogin: {
        fontSize: 10, 
        color: "blue"
    }
});