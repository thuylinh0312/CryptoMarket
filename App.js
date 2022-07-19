
import React, { useEffect } from 'react';
import { AppNavigation } from './src/navigation';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './src/reducers'
import createSagaMiddleware from 'redux-saga'
import coinSaga from './src/saga/coinSaga';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import rootSaga from './src/saga';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

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
