import React, {useMemo, useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux'
import { deleteFavoriteList } from '../../actions/coinListAction';
import { addFavoriteList } from '../../actions/coinListAction';
import { setValue } from '../../actions/coinListAction';
import { fetchChartCoinList } from '../../actions/coinListAction';
import { fetchCandleChartCoinList } from '../../actions/coinListAction';
import { setDisplayPrice } from '../../actions/coinListAction';
import { setDisplayTime } from '../../actions/coinListAction';
import { images } from '../../../assets/images';
import { ChartCoinList } from './components/ChartCoinList';
import { TimeTitle } from './components/TimeTitle';

const OverviewScreen = ({navigation}) => {
    const dispatch = useDispatch() 
    const [chart, setChart] = useState(true)
    const [displayVolume, setDisplayVolume] = useState(true)
    const [togglePrice, setTogglePrice] = useState(true)

    const {displayPrice, displayTime, time, num, id: idReducer, listValue, value,
        listCandleChart, interval, count, time_period } = useSelector(state => {
        return state.chartList
    })
    useEffect(() => {
        dispatch(fetchChartCoinList({idReducer, time, num}))
    }, [time, num]) 
    useEffect(() => {
        if(!chart){
            dispatch(fetchCandleChartCoinList({idReducer, interval, count, time_period}))
        }
    }, [interval, count, time_period])
    const favoriteList = useSelector(state => {
        return state.favoriteList.favorite
    })
    const item = useSelector(state => {
        return state.coinListOption.list.filter(e => e.id === idReducer );
    })
    const onFavourite = (id) => {
        if (favoriteList.includes(id)){
          dispatch(deleteFavoriteList(id))
        }else{
          dispatch(addFavoriteList(id))
        }
    }
    const percentUSD = useMemo(()=>{
        switch(value){
            case "1h":
                return item[0].quote.USD.percent_change_1h 
            case "24h":
                return item[0].quote.USD.percent_change_24h 
            case "7d":
                return item[0].quote.USD.percent_change_7d
            case "30d":
                return item[0].quote.USD.percent_change_30d
            case "60d":
                return item[0].quote.USD.percent_change_60d
            case "90d":
                return item[0].quote.USD.percent_change_90d
        }
    },[value])
    const percentBTC = useMemo(()=>{
        switch(value){
            case "1h":
                return item[0].quote.BTC.percent_change_1h 
            case "24h":
                return item[0].quote.BTC.percent_change_24h 
            case "7d":
                return item[0].quote.BTC.percent_change_7d
            case "30d":
                return item[0].quote.BTC.percent_change_30d
            case "60d":
                return item[0].quote.BTC.percent_change_60d
            case "90d":
                return item[0].quote.BTC.percent_change_90d
        }
    },[value])
    const percent = togglePrice ? percentUSD : percentBTC
    const toggleValue = () => {
        setTogglePrice(!togglePrice)
        dispatch(setDisplayPrice(0))
        dispatch(setDisplayTime(""))
    }
    return (
    <View style={styles.container}>
        <View style = {styles.title}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrowleft" size={27} color={ "black"}/>
            </TouchableOpacity>
            <Image 
            style={styles.image}
            source={{uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${idReducer}.png?_=5bcdbc6`}}
            />
            {item === [] ? null :
            <View style = {{flexDirection:"row"}}>
                <Text style={styles.name}>{item[0].name}</Text>
                <View style= {styles.cmc_rank}>
                    <Text style={styles.text}>#{item[0].cmc_rank}</Text>
                </View>
            </View>
            }
            
            <View style = {{flex:1}}></View>
            <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")}>
                <Icon name="search1" size={25} color={ "black"}/>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => onFavourite(idReducer)}>
                <Icon style={{marginLeft:12}} name={favoriteList.includes(idReducer) ? "star" : "staro"} size={25} color="black"/>
            </TouchableOpacity>
        </View>
            {item === [] ? null :
            <View style = {styles.title}>
                <View >
                    {togglePrice ? <Text style={styles.price}>$ {displayPrice === 0 ? item[0].quote.USD.price.toFixed(2) : displayPrice.toFixed(2)}</Text>
                    :<Text style={styles.price}>{displayPrice === 0 ? item[0].quote.BTC.price.toFixed(8) : displayPrice.toFixed(8)}</Text>
                    }
                    <Text style = {{fontSize: 12}}>{displayTime === "" ? "Today" : displayTime}</Text>
                </View>
                <View style = {{flex: 1}}></View>
                <View style = {percent > 0 ? styles.percent_up : styles.percent_down}>
                    {percent > 0 ?  <Image style = {styles.icon} source={images.up}/> : <Image style = {styles.icon} source={images.down}/>}
                    <Text style = {styles.text_percent}>{Math.abs(percent).toFixed(3)}%</Text>
                </View>
            </View>
            }  

        <View style = {styles.choose}>
             {!chart ? null :  <TimeTitle title = "1h"/>}
            <TimeTitle title = "24h"/>
            <TimeTitle title = "7d"/>
            <TimeTitle title = "30d"/>
            <TimeTitle title = "60d"/>
            <TimeTitle title = "90d"/>
            <TouchableOpacity onPress={() =>  {
                setChart(!chart)
                dispatch(setValue("24h"))
                dispatch(setDisplayPrice(0))
                dispatch(setDisplayTime(""))
            }}>
                {chart ? <Icon name="linechart" size={25} color={ "black"}/>: <Image style = {styles.icon_chart} source={images.chart}/>}
            </TouchableOpacity>
        </View>
        <View style = {styles.lineChart}>
            <ChartCoinList listValue = {listValue} listCandleChart = {listCandleChart} displayVolume = {displayVolume} togglePrice = {togglePrice} chart = {chart}/>
        </View> 
        <View style = {styles.bottom}>
            <TouchableOpacity onPress={() =>  setDisplayVolume(!displayVolume)}>
                {displayVolume ?  <Image style = {styles.circle} source={images.circle}/>
                : <Icon style = {{marginRight: 10}} name= "checkcircleo" size={19} color={ "black"}/>}
            </TouchableOpacity>
                
            <Text style = {{marginRight: 12}}>Volume</Text>
            <TouchableOpacity onPress={() =>  toggleValue()}>
                {togglePrice ?  <Image style = {styles.circle} source={images.circle}/>
                : <Icon style = {{marginRight: 10}} name= "checkcircleo" size={19} color={ "black"}/>}
            </TouchableOpacity>
                    
            <Text style = {{marginRight: 12}}>BTC</Text>
            <TouchableOpacity onPress={() =>  toggleValue()}>
                {!togglePrice ?  <Image style = {styles.circle} source={images.circle}/>
                : <Icon style = {{marginRight: 10}} name= "checkcircleo" size={19} color={ "black"}/>}
            </TouchableOpacity>
                    
            <Text >USD</Text>
        </View>
            
    </View>
  )
}

export default OverviewScreen
    const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
    },
    percent_up: {
        flexDirection: "row", 
        alignItems: "center",
        backgroundColor: "lightgreen", 
        justifyContent: "center",
        padding: 4, 
        borderRadius: 7, 
    },
    percent_down: {
        flexDirection: "row", 
        alignItems: "center",
        backgroundColor: "red", 
        justifyContent: "center",
        padding: 4, 
        borderRadius: 7, 
    },
    icon:{
        width:30, 
        height:30,
        tintColor: 'white'
    },
    name:{
        fontSize: 13 , 
        fontWeight:"bold",
    },
    cmc_rank: {
        backgroundColor: "lightgray", 
        justifyContent: "center", 
        alignItems: "center", 
        padding: 2, 
        borderRadius: 7,
        marginLeft: 5
    },
    text:{
        fontSize: 8 , 
        fontWeight:"bold",
    },
    price: {
        fontSize: 14, 
        fontWeight: "bold"
    },
    text_percent:{
        fontSize: 12 , 
        fontWeight:"bold",
        color: "white"
    },
    img: {
        width: 40,
        height: 40,
        borderRadius: 50
    },
    icon_chart: {
        width: 28,
        height: 28,
    },
    circle: {
        width: 23,
        height: 23,
        marginHorizontal: 6
    },
    title: {
        flexDirection: "row", 
        alignItems: "center",
        marginBottom: 15
    },
    image: {
        width: 35, 
        height: 35, 
        marginHorizontal: 10
    },
    choose: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        marginVertical: 10, 
        backgroundColor: "lightgray",
        padding: 4 , 
        borderRadius: 8, 
        alignItems: "center", 
    },
    bottom: {
        flexDirection: "row", 
        alignItems: "center",
        justifyContent: "flex-end", 
        marginRight: 5, 
        marginBottom: 10
    },
    lineChart: {
        flex: 1, 
        marginBottom: 15
    },
    });
