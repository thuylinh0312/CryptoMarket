const initialState = {
    favorite: [],
    favList: false,
};
const favoriteCoinList = (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_FAVORITE_LIST_REQUESTED':
            return {
                ...state,
            }
    
        case 'FETCH_FAVORITE_LIST_SUCCESS':
            return {
                ...state,
                favorite: action.favorite,
            }
         case 'ADD_FAVORITE_LIST_REQUESTED':
            return {
                ...state,
            }
    
        case 'ADD_FAVORITE_LIST_SUCCESS':
            return {
                ...state,
                favorite: action.favorite,
            }
        case 'DELETE_FAVORITE_LIST_REQUESTED':
            return {
                ...state,
            }
    
        case 'DELETE_FAVORITE_LIST_SUCCESS':
            let list = [...state.favorite]
            list = list.filter(function(item){
                return item !== action.id
            })
            return {
                ...state,
                favorite: list
            }
        case "OPEN_FAVORITE_LIST":
            let toggle = state.favList
            if (toggle === false){
                toggle = true
            }else  toggle = false
            return {
                ...state,
                favList: toggle
            } 
    
        default:
            return state;
    }
}
export default favoriteCoinList;

