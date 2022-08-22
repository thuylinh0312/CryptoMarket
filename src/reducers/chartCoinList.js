
const initialState = {
    id: 0,
    value: "1h",
    listValue: [],
    listCandleChart: [],
    time: "5m",
    num: 12,
    displayPrice: 0,
    displayTime: "",
    interval: "1d",
    count: 24,
    time_period: "hourly"

};
const chartCoinList = (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_CHART_COIN_LIST_REQUESTED':
            return {
                ...state,
            }
        case 'FETCH_CHART_COIN_LIST_SUCCESS':
            return {
                ...state,
                listValue: action.listValue,
            }
        case 'FETCH_CANDLE_CHART_COIN_LIST_REQUESTED':
            return {
                ...state,
            }
        case 'FETCH_CANDLE_CHART_COIN_LIST_SUCCESS':
            return {
                ...state,
                listCandleChart: action.listValue,
            }
        case 'SET_ID':
            return {
                ...state,
                id: action.str
            }
        case 'SET_DISPLAY_PRICE':
            return {
                ...state,
                displayPrice: action.value
            }
        case 'SET_DISPLAY_TIME':
            return {
                ...state,
                displayTime: action.time
            }
        case 'SET_VALUE':
            let setTime = "5m"
            let setNum = 12
            let setInterval = "1d"
            let setCount = 24
            let setTimePeriod = "hourly"
            if(action.str === "24h"){
                setTime = "1h"
                setNum = 24
                setInterval = "hourly"
                setCount = 24
                setTimePeriod = "hourly"
            }
            if(action.str === "7d"){
                setTime = "4h"
                setNum = 42
                setInterval = "1d"
                setCount = 7
                setTimePeriod = "daily"
            }
            if(action.str === "30d"){
                setTime = "12h"
                setNum = 60
                setInterval = "1d"
                setCount = 30
                setTimePeriod = "daily"
            }
            if(action.str === "60d"){
                setTime = "12h"
                setNum = 120
                setInterval = "1d"
                setCount = 60
                setTimePeriod = "daily"
            }
            if(action.str === "90d"){
                setTime = "12h"
                setNum = 180
                setInterval = "1d"
                setCount = 90
                setTimePeriod = "daily"
            }
            return {
                ...state,
                value: action.str,
                time: setTime,
                num: setNum,
                interval: setInterval,
                count: setCount,
                time_period: setTimePeriod
            }  
        default:
            return state;
    }
}
export default chartCoinList;
