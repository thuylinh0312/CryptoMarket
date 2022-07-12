import React, {useEffect} from 'react'
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native'
import auth from '@react-native-firebase/auth';
import { ApiUtil } from '../../configs/ApiConfig';

const LoadingScreen = ({navigation}) => {
    console.log('LOadingggggg')

    useEffect(() => {
        auth().onAuthStateChanged(user => {
            console.log('user ==========> ', user)

            if (user) {
                ApiUtil.init(user.uid)
            }
            navigation.navigate(user ? 'DrawerScreen' : 'LoginScreen')
        })
    }, []) 
    return (
    <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
    </View>
  )
}

export default LoadingScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});