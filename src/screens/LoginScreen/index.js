import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView} from 'react-native'

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [display, setDisplay] = useState(true)
    const handleSignIn = () => {
        if( email === "" || password === ""){
            alert("Vui lòng nhập đầy đủ thông tin!")
        }else{
            auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                navigation.navigate("LoadingScreen")
                setEmail("")
                setPassword("")
            })
            .catch(error => {
                if (error.code === 'auth/wrong-password') {
                    Alert.alert(
                        "Đăng nhập thất bại!",
                        `Sai mật khẩu`,
                    );
                }

                if (error.code === 'auth/user-not-found') {
                    Alert.alert(
                        "Đăng nhập thất bại!",
                        `Vui lòng kiểm tra thông tin đăng nhập`,
                    );
                }

                console.error(error);
            });
        }
        
    }

    return (
    <View style={styles.container}>
        <View  style = {{flex: 1}}>
            <Text style = {{marginTop: 30}}>Welcome!</Text>
            <Text style = {styles.textLogin}>Login</Text>

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
                    secureTextEntry={display}
                    placeholder = "Enter your password..."
                    />
                    <TouchableOpacity onPress={() => setDisplay(!display)}>
                        <Icon style={{marginRight: 8}} name={display ? "eye-slash" : "eye"} size={18} color="lightgray"/>
                    </TouchableOpacity>
                    
                </View>
                </View>
            
            <View style = {styles.text}>
                <Text style = {{fontSize: 10}}>New to CryptoMarket? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
                    <Text style = {{fontSize: 10, color: "blue"}}>Create an Account</Text>
                </TouchableOpacity>
            </View>
        </View>
        

        <View style = {styles.logIn}>
            <TouchableOpacity onPress={() => handleSignIn() }>
                <Text>Log In</Text>
            </TouchableOpacity>
            
        </View> 
        
    </View>
  )
}

export default LoginScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    textLogin: {
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
    logIn: {
        backgroundColor: "gray",
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
    }
});