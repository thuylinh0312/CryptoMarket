const CURRENCY_LIST =["USD", "BTC"]
const SORT_DIR_VALUE =["desc", "asc"]
const initialState = {
    list: [],
    data: [
        {id: "tt1", title:  CURRENCY_LIST[0]},
        {id: "tt2", title: "Sort by Rank"},
        {id: "tt3", title: "%(24h)"},
        {id: "tt4", title: "All Cryptocurrencies"},
    ],
    sortDir:  SORT_DIR_VALUE[0],
    partList: []
};


const coinListOptionReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_COIN_LIST_REQUESTED':
            return {
                ...state,
            }
        case 'FETCH_COIN_LIST_SUCCESS':
            return {
                ...state,
                list: action.list,
                partList: action.list.slice(0,20),
            }
        case 'ADD_LIST':
            return {
                ...state,
                partList: action.list,
            }
        case 'SORT_BY_COIN_LIST':
            const sort = [...state.data]
            if(action.sortByValue === "Rank"){
                sort[1].title = "Sort by Rank"
            }
            if(action.sortByValue === "% Change"){
                sort[1].title = "Sort by %"
            }
            if(action.sortByValue === "Market Cap"){
                sort[1].title = "Sort by MC"
            }
            if(action.sortByValue === "Volume 24h"){
                sort[1].title = "Sort by Vol (24h)"
            }
            if(action.sortByValue === "Circulating Supply"){
                sort[1].title = "Sort by C. Supply"
            }
            if(action.sortByValue === "Price"){
                sort[1].title = "Sort by Price"
            }
            if(action.sortByValue === "Name"){
                sort[1].title = "Sort by Name"
            }
            return {
                ...state,
                data: sort,
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
            lookingFor[3].title = action.lookingForValue
            return {
                ...state,
                data: lookingFor,  
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