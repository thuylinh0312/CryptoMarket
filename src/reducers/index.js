import { combineReducers } from 'redux'
import coinListReducer from './coinListReducer'
import coinListOptionReducer from './coinListOption'

export default combineReducers({
    coinList: coinListReducer,
    coinListOption: coinListOptionReducer,
})