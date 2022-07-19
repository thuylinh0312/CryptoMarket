import { all} from 'redux-saga/effects'
import coinSaga from "./coinSaga"
export default function* rootSaga () {
    yield all([
        coinSaga(),
    ]) 
}