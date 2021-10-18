import {applyMiddleware, createStore, Middleware, Store} from 'redux';
import createSagaMiddleware from 'redux-saga';
import createDebugger from 'redux-flipper';

import {rootReducer, ApplicationState} from './rootReducer';
import {rootSaga} from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const middlewares: Middleware[] = [sagaMiddleware];

if (__DEV__) {
  middlewares.push(createDebugger());
}

const configureStore = (): Store<ApplicationState> =>
  createStore(rootReducer, applyMiddleware(...middlewares));

export const store = configureStore();
export const runSaga = () => sagaMiddleware.run(rootSaga);
runSaga();
