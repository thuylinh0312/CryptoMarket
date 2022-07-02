import { call, put, takeEvery} from 'redux-saga/effects'
import axios from 'axios';

function* fetchCoinList(value) {
    try {
        const data = yield call(() => 
        axios.get(`https://web-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&sort_dir=${value.sortSaga.sortDir}&limit=1000&convert=USD,BTC${value.sortSaga.type}${value.sortSaga.sortValue}`)   
        );
        yield put({type: "FETCH_COIN_LIST_SUCCESS", list: data.data.data});
    } catch (e) {
        console.log("error",e)
    }
}


function* coinListSaga() {
    yield takeEvery("FETCH_COIN_LIST_REQUESTED", fetchCoinList);
}

export default coinListSaga;