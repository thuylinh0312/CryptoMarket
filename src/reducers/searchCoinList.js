const initialState = {
    searchValue: "",
};
const searchCoinList = (state = initialState, action) => {
    switch(action.type) {

        case 'CHANGE_SEARCH_VALUE':
            return {
                ...state,
                searchValue: action.str
            }
            
        default:
            return state;
    }
}
export default searchCoinList;