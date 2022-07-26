import { combineReducers } from 'redux'
import coinListOptionReducer from './coinListOption'
import favoriteCoinList from './favoriteCoinList'
import searchCoinList from './searchCoinList'
import updateProfileFirebase from './updateProfileFirebase'

export default combineReducers({
    coinListOption: coinListOptionReducer,
    favoriteList: favoriteCoinList,
    searchList: searchCoinList,
    updateProfile: updateProfileFirebase,
})