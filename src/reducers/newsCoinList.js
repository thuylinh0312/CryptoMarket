const initialState = {
    listNews: [],
    listNewsId: []
};
const newsCoinList = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_MORE_NEWS_REQUESTED':
            return {
                ...state,
            }
        case 'ADD_MORE_NEWS_SUCCESS':
            return {
                ...state,
                listNews: state.listNews.concat(action.moreData),
            }   
        case 'ADD_MORE_NEWS_ID_REQUESTED':
            return {
                ...state,
                }
        case 'ADD_MORE_NEWS_ID_SUCCESS':
            return {
                ...state,
                listNewsId: state.listNewsId.concat(action.moreData),
            } 
        case 'RESET_NEWS':
            return {
                ...state,
                listNews: [],
                listNewsId: [],
            } 
        default:
            return state;
    }
}
export default newsCoinList;