import { combineReducers } from 'redux'
import coinListReducer from './coinListReducer'

export default combineReducers({
    coinList: coinListReducer,
})