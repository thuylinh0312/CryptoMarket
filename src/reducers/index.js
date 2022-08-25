import { combineReducers } from 'redux'
import coinListOptionReducer from './coinListOption'
import favoriteCoinList from './favoriteCoinList'
import searchCoinList from './searchCoinList'
import updateProfileFirebase from './updateProfileFirebase'
import chartCoinList from './chartCoinList'
import newsCoinList from './newsCoinList'
import converterPrice from './converterPrice'

export default combineReducers({
    coinListOption: coinListOptionReducer,
    favoriteList: favoriteCoinList,
    searchList: searchCoinList,
    updateProfile: updateProfileFirebase,
    chartList: chartCoinList,
    newsList: newsCoinList,
    converter: converterPrice,
})