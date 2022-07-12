import React, {useEffect} from 'react'
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native'
import auth from '@react-native-firebase/auth';

const LoadingScreen = ({navigation}) => {
    useEffect(() => {
        auth().onAuthStateChanged(user => {
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