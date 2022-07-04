import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView} from 'react-native'
//eye-slash
const LoginScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
        <View  style = {{flex: 1}}>
            <Text style = {{marginTop: 30}}>Welcome!</Text>
            <Text style = {styles.textLogin}>Login</Text>

                <View>
                <Text>Email Address</Text>
                <View style = {styles.email}>
                    <TextInput
                    placeholder = "Enter your email address..."
                    />
                </View>
                <Text>Password</Text>
                <View style = {styles.pass}>
                    <TextInput
                    style = {{flex: 1}}
                    placeholder = "Enter your password..."
                    />
                    <TouchableOpacity>
                        <Icon style={{marginRight: 8}} name="eye" size={18} color="lightgray"/>
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
            <TouchableOpacity>
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
        backgroundColor: "yellow"
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
    }
});