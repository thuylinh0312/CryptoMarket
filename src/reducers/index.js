import { combineReducers } from 'redux'
import coinListOptionReducer from './coinListOption'
import favoriteCoinList from './favoriteCoinList'
import searchCoinList from './searchCoinList'

export default combineReducers({
    coinListOption: coinListOptionReducer,
    favoriteList: favoriteCoinList,
    searchList: searchCoinList
})