const CURRENCY_LIST =["USD", "BTC"]
const SORT_DIR_VALUE =["desc", "asc"]
const initialState = {
    data: [
        {id: "tt1", title:  CURRENCY_LIST[0]},
        {id: "tt2", title: "Sort by Rank"},
        {id: "tt3", title: "%(24h)"},
        {id: "tt4", title: "All Cryptocurrencies"},
    ],
    sortValue: "",
    sortDir:  SORT_DIR_VALUE[0],
    type: "",
   
};


const coinListOptionReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SORT_BY_COIN_LIST':
            const sort = [...state.data]
            let sortValue1 = ""
        
            if(action.sortByValue === "Rank"){
                sort[1].title = "Sort by Rank"
                sortValue1 = ""
            }
            if(action.sortByValue === "% Change"){
                sort[1].title = "Sort by %"
                sortValue1 = "&sort=percent_change_24h"
            }
            if(action.sortByValue === "Market Cap"){
                sort[1].title = "Sort by MC"
                sortValue1 = "&sort=market_cap"
            }
            if(action.sortByValue === "Volume 24h"){
                sort[1].title = "Sort by Vol (24h)"
                sortValue1 = "&sort=volume_24h"
            }
            if(action.sortByValue === "Circulating Supply"){
                sort[1].title = "Sort by C. Supply"
                sortValue1 = "&sort=circulating_supply"
            }
            if(action.sortByValue === "Price"){
                sort[1].title = "Sort by Price"
                sortValue1 = "&sort=price"
            }
            if(action.sortByValue === "Name"){
                sort[1].title = "Sort by Name"
                sortValue1 = "&sort=name"
            }
            return {
                ...state,
                data: sort,
                sortValue: sortValue1
            }
        case 'PERCENT_CHANGE_COIN_LIST':
            const data2 = [...state.data]
        
            if(action.percentValue === "1h"){
                data2[2].title = "%(1h)"
            }else{
                if(action.percentValue === "24h"){
                    data2[2].title = "%(24h)"
                }else{
                    data2[2].title = "%(7d)"
                }
            }
            return {
                ...state,
                data: data2
            }
        case 'LOOKING_FOR_COIN_LIST':
            const lookingFor = [...state.data]
            let type1 = ""
            
            if(action.lookingForValue === "All Cryptocurrencies"){
                lookingFor[3].title = "All Cryptocurrencies"
                type1 = ""
            }else{
                if(action.lookingForValue === "Coins"){
                    lookingFor[3].title = "Coins"
                    type1 = "&cryptocurrency_type=coins"
                }else{
                    lookingFor[3].title = "Tokens"
                    type1 = "&cryptocurrency_type=tokens"
                }
            }
            return {
                ...state,
                data: lookingFor,
                type: type1
            }
        case "TOGGLE_CURRENCY":
            const currency = [...state.data]
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
                data: currency
            }
        case "TOGGLE_ICON_SORT":
            let icon = state.sortDir
            if (icon === "desc"){
                icon = "asc"
            }else  icon = "desc"
            return {
                ...state,
                sortDir: icon
            }  
        default:
            return state;
        
    }
}
export default coinListOptionReducer;