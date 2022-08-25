import { call, put, takeEvery, all} from 'redux-saga/effects'
import axios from 'axios';
import { ApiUtil } from '../configs/ApiConfig';

function* fetchCoinList() {
    try {
        const data = yield call(() =>  
        axios.get(`https://web-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&sort_dir=desc&limit=5000&convert=USD,BTC`) 
        );
        yield put({type: "FETCH_COIN_LIST_SUCCESS", list: data.data.data });
    } catch (e) {
        console.log("error",e)
    }
}
function* coinListSaga() {
    yield takeEvery("FETCH_COIN_LIST_REQUESTED", fetchCoinList);
}

function* converterPrice() {
    try {
        const data = yield call(() =>  
        axios.get(`https://api.coinmarketcap.com/data-api/v3/tools/price-conversion?amount=1&convert_id=2781&id=1`) 
        );
        yield put({type: "CONVERTER_SUCCESS", usd: data.data.data.quote[0].price.toFixed(2)});
    } catch (e) {
        console.log("error",e)
    }
}
function* converterSaga() {
    yield takeEvery("CONVERTER_REQUESTED", converterPrice);
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

function* fetchCandleChartCoinList(value) {
    try {
        const data = yield call(() =>  
        axios.get(`https://web-api.coinmarketcap.com/v1/cryptocurrency/ohlcv/historical?id=${value.value.idReducer}&convert=usd,btc&interval=${value.value.interval}&count=${value.value.count}&time_period=${value.value.time_period}`) 
        );
        yield put({type: "FETCH_CANDLE_CHART_COIN_LIST_SUCCESS", listValue: data.data.data.quotes.map(e => e.quote)});
    } catch (e) {
        console.log("error",e)
    }
}
function* candleChartCoinListSaga() {
    yield takeEvery("FETCH_CANDLE_CHART_COIN_LIST_REQUESTED", fetchCandleChartCoinList);
}

function* addMoreNews(page) {
    try {
        const data = yield call(() =>  
        axios.get(`https://api.coinmarketcap.com/content/v3/news?page=${page.page}&size=20`) 
        );
        yield put({type: "ADD_MORE_NEWS_SUCCESS", moreData: data.data.data});
    } catch (e) {
        console.log("error",e)
    }
}
function* addMoreNewsSaga() {
    yield takeEvery("ADD_MORE_NEWS_REQUESTED", addMoreNews);
}

function* addMoreNewsId(value) {
    try {
        const data = yield call(() =>  
        axios.get(`https://api.coinmarketcap.com/content/v3/news?page=${value.page}&size=20&coins=${value.id}`) 
        );
        yield put({type: "ADD_MORE_NEWS_ID_SUCCESS", moreData: data.data.data});
    } catch (e) {
        console.log("error",e)
    }
}
function* addMoreNewsIdSaga() {
    yield takeEvery("ADD_MORE_NEWS_ID_REQUESTED", addMoreNewsId);
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
        candleChartCoinListSaga(),
        addMoreNewsSaga(),
        addMoreNewsIdSaga(),
        converterSaga() 
    ]) 
}
