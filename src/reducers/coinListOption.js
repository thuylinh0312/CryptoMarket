const CURRENCY_LIST =["USD", "BTC"]
const initialState = {
    DATA: [
        {id: "tt1", title:  CURRENCY_LIST[0]},
        {id: "tt2", title: "Sort by Rank"},
        {id: "tt3", title: "%(24h)"},
        {id: "tt4", title: "All Cryptocurrencies"},
    ],
   
};

const coinListOptionReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'PERCENT_CHANGE_COIN_LIST':
            const data = [...state.DATA]
        
            if(action.percentValue === "1h"){
                data[2].title = "%(1h)"
            }else{
                if(action.percentValue === "24h"){
                    data[2].title = "%(24h)"
                }else{
                    data[2].title = "%(7d)"
                }
            }
            return {
                ...state,
                // DATA: action.DATA.map((e, index) => {
                //     if (index === 2) {
                //         return {
                //             ...e,
                //             title: "%(1h)"
                //         }
                //     } else {
                //         return e
                //     }
                // })
                DATA: data
            }
        case 'LOOKING_FOR_COIN_LIST':
            const lookingFor = [...state.DATA]
            
            if(action.lookingForValue === "All Cryptocurrencies"){
                lookingFor[3].title = "All Cryptocurrencies"
            }else{
                if(action.lookingForValue === "Coins"){
                    lookingFor[3].title = "Coins"
                }else{
                    lookingFor[3].title = "Tokens"
                }
            }
            return {
                ...state,
                DATA: lookingFor
            }
        case "TOGGLE_CURRENCY":
            const currency = [...state.DATA]
            const index = CURRENCY_LIST.findIndex((value)=>{
                return value === currency[0].title
            })
            if(index < CURRENCY_LIST.length-1){
                currency[0].title = CURRENCY_LIST[index +1]
            }else{
                currency[0].title = CURRENCY_LIST[0]
            }

            return {
                ...state,
                DATA: currency
            }
            
        default:
            return state;
    }
}
export default coinListOptionReducer;