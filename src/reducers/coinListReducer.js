const initialState = {
    list: [],
    loading: false,
};
const coinListReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_COIN_LIST_REQUESTED':
            return {
                ...state,
                loading: true
            }

        case 'FETCH_COIN_LIST_SUCCESS':
            return {
                ...state,
                list: state.list.concat(action.list),
                loading: false
            }
        case 'RESET_COIN_LIST':
            return {
                ...state,
                list: [],
                loading: false
            }
        default:
            return state;
    }
}
export default coinListReducer;