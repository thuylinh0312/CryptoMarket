
const initialState = {
    usd: null,
};
const converterPrice = (state = initialState, action) => {
    switch(action.type) {

        case 'CONVERTER_REQUESTED':
            return {
                ...state,
            }
    
        case 'CONVERTER_SUCCESS':
            return {
                ...state,
                usd: action.usd,
            }
            
        default:
            return state;
    }
}
export default converterPrice;