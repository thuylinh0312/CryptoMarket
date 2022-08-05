
const initialState = {
    id: 0,
    value: "1h",
    listValue: [],
    time: "5m",
    num: 12,
    displayPrice: 0,
    displayTime: "",
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
            if(action.str === "24h"){
                setTime = "1h"
                setNum = 24
            }
            if(action.str === "7d"){
                setTime = "4h"
                setNum = 42
            }
            if(action.str === "30d"){
                setTime = "12h"
                setNum = 60
            }
            if(action.str === "60d"){
                setTime = "12h"
                setNum = 120
            }
            if(action.str === "90d"){
                setTime = "12h"
                setNum = 180
            }
            return {
                ...state,
                value: action.str,
                time: setTime,
                num: setNum
            }  
        default:
            return state;
    }
}
export default chartCoinList;
