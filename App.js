
import React from 'react';
import { AppNavigation } from './src/navigation';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './src/reducers'
import createSagaMiddleware from 'redux-saga'
import coinListSaga from './src/saga/coinListSaga';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(coinListSaga)

const App = () => {
  
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
   
  )
}

export default App;
