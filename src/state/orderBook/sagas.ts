import {put, takeLatest, select, takeEvery, throttle} from 'redux-saga/effects';
import {BOOK_UI_FEED_SNAPSHOT, BOOK_UI_FEED} from '@app/consts';
import {PRICE_SIZES_UPDATE_THROTTLE_MS} from './consts';
import {actions as webSocketsActions} from '../webSockets';
import {
  setPriceSizes,
  setCachedPriceSizes,
  OrderBookAction,
  ChangeProductIdAction,
  setProductId,
  SubscribeProductIdAction,
  moveCachedPriceSizesToMain,
  UnsubscribeProductIdAction,
} from './actions';
import {productId} from './selectors';
import {priceSizeToMap} from './utils';

function* changeProductIdSaga(action: ChangeProductIdAction) {
  const {payload: newProductId} = action;

  const oldProductId: string = yield select(productId);
  if (oldProductId) {
    yield put(webSocketsActions.unsubscribeFromPriceFeed(oldProductId));
  }

  yield put(setProductId(newProductId));

  yield put(webSocketsActions.subscribeToPriceFeed(newProductId));
}

function* subscribeProductIdSaga(action: SubscribeProductIdAction) {
  yield put(webSocketsActions.subscribeToPriceFeed(action.payload));
}

function* unsubscribeProductIdSaga(action: UnsubscribeProductIdAction) {
  yield put(webSocketsActions.unsubscribeFromPriceFeed(action.payload));
}

function* moveCachedPriceSizesToMainSaga() {
  yield put(moveCachedPriceSizesToMain());
}

function* throttleSetPriceSizes() {
  yield throttle(
    PRICE_SIZES_UPDATE_THROTTLE_MS,
    OrderBookAction.SetCachedPriceSizes,
    moveCachedPriceSizesToMainSaga,
  );
}

export function* setPriceSizesSaga(
  action: webSocketsActions.EmitPriceFeedAction,
) {
  const {asks, bids, product_id, feed} = action.payload;

  const _productId: string = yield select(productId);

  if (_productId !== product_id) {
    return;
  }

  const bidsMap = priceSizeToMap(bids);
  const asksMap = priceSizeToMap(asks);

  if (feed === BOOK_UI_FEED_SNAPSHOT) {
    yield put(
      setPriceSizes({
        bids: bidsMap,
        asks: asksMap,
      }),
    );
    return;
  }
  if (feed === BOOK_UI_FEED) {
    yield put(
      setCachedPriceSizes({
        bids: bidsMap,
        asks: asksMap,
      }),
    );
  }
}

export default [
  takeLatest(OrderBookAction.ChangeProductId, changeProductIdSaga),
  takeEvery(OrderBookAction.SubscribeProductId, subscribeProductIdSaga),
  takeEvery(OrderBookAction.UnsubscribeProductId, unsubscribeProductIdSaga),
  takeEvery(
    webSocketsActions.WebSocketsAction.EmitPriceFeed,
    setPriceSizesSaga,
  ),
  takeEvery(
    webSocketsActions.WebSocketsAction.StartListening,
    throttleSetPriceSizes,
  ),
];
