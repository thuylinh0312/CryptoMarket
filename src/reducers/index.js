import { combineReducers } from 'redux'
import coinListReducer from './coinListReducer'
import coinListOptionReducer from './coinListOption'
import favoriteCoinList from './favoriteCoinList'

export default combineReducers({
    coinList: coinListReducer,
    coinListOption: coinListOptionReducer,
    favoriteList: favoriteCoinList
})