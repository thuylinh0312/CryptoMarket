import React, {useState, useEffect}  from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image, TextInput} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux'
import { converter } from '../../actions/coinListAction';

const ConverterScreen = ({navigation}) => {
    const dispatch = useDispatch() 
    
    useEffect(() => {
        dispatch(converter())
    }, []) 
    const usd = useSelector(state => {
        return state.converter.usd
    })
    const [BTC, setBTC] = useState("1")
    const [USD, setUSD] = useState(usd.toString())
    const changeBTC = (value) => {
        setBTC(value)
        const floatValue = parseFloat(value) || 0
        setUSD((floatValue * usd).toString())
    }
    const changeUSD = (value) => {
        setUSD(value)
        const floatValue = parseFloat(value) || 0
        setBTC((floatValue / usd).toString())
    }
    return (
    <View style={styles.container}>
        <View style = {styles.title}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrowleft" size={30} color={ "black"}/>
            </TouchableOpacity>
            <Text style = {styles.texttt}>Currency Converter</Text>
        </View> 
        <View style = {{backgroundColor: "lightgray", borderRadius: 15}}>
            <View style = {{flexDirection: "row", justifyContent: "center", alignItems: "center", padding: 10}}>
                <Image 
                    style={styles.image}
                    source={{uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/1.png?_=5bcdbc6`}}
                />
                <Text style = {styles.texttt}>BTC</Text>
                <View style = {{flex: 1, backgroundColor: "red"}}></View>
                <TextInput
                    value={BTC.length < 15 ? BTC : BTC.slice(0,15)}
                    keyboardType='numeric'
                    onChangeText={changeBTC}
                />

            </View>
        </View>

        <View style = {{backgroundColor: "lightgray", borderRadius: 15, marginTop: 15}}>
            <View style = {{flexDirection: "row", justifyContent: "center", alignItems: "center", padding: 10}}>
                <Image 
                    style={styles.image}
                    source={{uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/2781.png?_=5bcdbc6`}}
                />
                <Text style = {styles.texttt}>USD</Text>
                <View style = {{flex: 1, backgroundColor: "red"}}></View>
                <TextInput
                    value={USD.length < 15 ? USD : USD.slice(0,15)}
                    keyboardType='numeric'
                    onChangeText={changeUSD}
                />

            </View>
        </View>
    </View>
  )
}

export default  ConverterScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
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
    image: {
        width: 45, 
        height: 45, 
        marginRight: 3
    },
});