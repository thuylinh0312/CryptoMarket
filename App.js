
import React, { useEffect } from 'react';
import { AppNavigation } from './src/navigation';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './src/reducers'
import createSagaMiddleware from 'redux-saga'
import coinListSaga from './src/saga/coinListSaga';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(coinListSaga)

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    </GestureHandlerRootView>
  )
}

export default App;
