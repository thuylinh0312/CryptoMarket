import { call, put, takeEvery} from 'redux-saga/effects'
import axios from 'axios';

function* fetchCoinList(value) {
    try { 
        const data = yield call(() => axios.get(`https://web-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=${value.start}&sort_dir=desc&limit=15`));
        yield put({type: "FETCH_COIN_LIST_SUCCESS", list: data.data.data});
    } catch (e) {

    }
}

function* coinListSaga() {
    yield takeEvery("FETCH_COIN_LIST_REQUESTED", fetchCoinList);
  }

export default coinListSaga;