import {all} from 'redux-saga/effects';
import {sagas as webSocketsSagas} from './webSockets';
import {sagas as orderBookSagas} from './orderBook';

export function* rootSaga() {
  yield all([...webSocketsSagas, ...orderBookSagas]);
}

export default rootSaga;
