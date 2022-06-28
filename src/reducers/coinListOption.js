const initialState = {
    DATA: [
        {id: "tt1", title: "My Watchlists"},
        {id: "tt2", title: "USD"},
        {id: "tt3", title: "Sort by Rank"},
        {id: "tt4", title: "%(24h)"},
        {id: "tt5", title: "All Cryptocurrencies"},
    ],
};

const coinListOptionReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'PERCENT_CHANGE_COIN_LIST':
            const data = [...state.DATA]
        
            if(action.percentValue === "1h"){
                data[3].title = "%(1h)"
            }else{
                if(action.percentValue === "24h"){
                    data[3].title = "%(24h)"
                }else{
                    data[3].title = "%(7d)"
                }
            }
            return {
                ...state,
                // DATA: action.DATA.map((e, index) => {
                //     if (index === 3) {
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
                lookingFor[4].title = "All Cryptocurrencies"
            }else{
                if(action.lookingForValue === "Coins"){
                    lookingFor[4].title = "Coins"
                }else{
                    lookingFor[4].title = "Tokens"
                }
            }
            return {
                ...state,
                DATA: lookingFor
            }
        default:
            return state;
    }
}
export default coinListOptionReducer;