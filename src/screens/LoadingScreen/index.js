import React, {useEffect} from 'react'
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native'
import auth from '@react-native-firebase/auth';
import { ApiUtil } from '../../configs/ApiConfig';

const LoadingScreen = ({navigation}) => {
    useEffect(() => {
        const user = auth().currentUser
        if (user) {
            ApiUtil.init(user.uid)
        }
        navigation.reset(user ? {index: 0, routes: [{name: 'DrawerScreen'}]} : {index: 0, routes: [{name: 'LoginScreen'}]})  
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