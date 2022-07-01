const initialState = {
    favList: [],
};
const favoriteCoinList = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_FAVORITE_COIN_LIST':
            return {
                ...state,
            }
        case 'DELETE_FAVORITE_COIN_LIST':
            return {
                ...state,
            }
    
        default:
            return state;
    }
}
export default favoriteCoinList;