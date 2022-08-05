import { call, put, takeEvery, all} from 'redux-saga/effects'
import axios from 'axios';
import { ApiUtil } from '../configs/ApiConfig';

function* fetchCoinList() {
    try {
        const data = yield call(() =>  
        axios.get(`https://web-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&sort_dir=desc&limit=30&convert=USD,BTC`) 
        );
        yield put({type: "FETCH_COIN_LIST_SUCCESS", list: data.data.data });
    } catch (e) {
        console.log("error",e)
    }
}
function* coinListSaga() {
    yield takeEvery("FETCH_COIN_LIST_REQUESTED", fetchCoinList);
}

function* fetchChartCoinList(value) {
    try {
        const data = yield call(() =>  
        axios.get(`https://web-api.coinmarketcap.com/v1/cryptocurrency/quotes/historical?id=${value.value.idReducer}&convert=usd,btc&format=chart_crypto_details&interval=${value.value.time}&count=${value.value.num}`) 
        );
        yield put({type: "FETCH_CHART_COIN_LIST_SUCCESS", listValue: data.data.data});
    } catch (e) {
        console.log("error",e)
    }
}
function* chartCoinListSaga() {
    yield takeEvery("FETCH_CHART_COIN_LIST_REQUESTED", fetchChartCoinList);
}

function* fetchFavoriteList() {
    try {
        const data = yield call(() => 
        ApiUtil.callApi({url: 'app/get-favourites', method: 'GET'})
        );
        yield put({type: "FETCH_FAVORITE_LIST_SUCCESS", favorite: data.data ? data.data.favourites : []});
    } catch (e) {
        console.log("error",e)
    }
}
function* favoriteListSaga() {
    yield takeEvery("FETCH_FAVORITE_LIST_REQUESTED", fetchFavoriteList);
}


function* addFavoriteList(value) {
    try {
        const data = yield call(() => 
        ApiUtil.callApi({url: 'app/add-favourite', method: 'POST', data: {coin_id: value.id}})
        );
        yield put({type: "ADD_FAVORITE_LIST_SUCCESS", favorite: data.data.favourites});
    } catch (e) {
        console.log("error",e)
    }
}
function* addFavoriteListSaga() {
    yield takeEvery("ADD_FAVORITE_LIST_REQUESTED", addFavoriteList);
}


function* deleteFavoriteList(value) {
    try {
        yield call(() => 
        ApiUtil.callApi({url: 'app/delete-favourite', method: 'POST', data: {coin_id: value.id}})
        );
        yield put({type: "DELETE_FAVORITE_LIST_SUCCESS", id: value.id} );
    } catch (e) {
        console.log("error",e)
    }
}
function* deleteFavoriteListSaga() {
    yield takeEvery("DELETE_FAVORITE_LIST_REQUESTED", deleteFavoriteList);
}

export default function* coinSaga () {
    yield all([
        coinListSaga(),
        favoriteListSaga(),
        addFavoriteListSaga(),
        deleteFavoriteListSaga(),
        chartCoinListSaga(),
    ]) 
}
