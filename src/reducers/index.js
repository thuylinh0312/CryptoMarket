import { combineReducers } from 'redux'
import coinListReducer from './coinListReducer'
import coinListOptionReducer from './coinListOption'
import favoriteCoinList from './favoriteCoinList'
import searchCoinList from './searchCoinList'

export default combineReducers({
    coinList: coinListReducer,
    coinListOption: coinListOptionReducer,
    favoriteList: favoriteCoinList,
    searchList: searchCoinList
})