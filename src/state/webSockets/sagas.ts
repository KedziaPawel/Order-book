import {put, call, takeEvery, select, take} from 'redux-saga/effects';
import {eventChannel, EventChannel} from 'redux-saga';
import {Action} from 'redux';
import {BOOK_UI_FEED, BOOK_UI_FEED_SNAPSHOT} from '@app/consts';
import {webSockets as webSocketsUtils} from '@app/utils';

import {
  connect,
  initWebSocketsInstance,
  emitPriceFeed,
  onError,
  WebSocketsAction,
  StartListeningAction,
  SubscribeToPriceFeedAction,
  UnsubscribeFromPriceFeedAction,
  disconnect,
} from './actions';
import {webSocket} from './selectors';

const createWebSocketsChannel = (ws: WebSocket) =>
  eventChannel(emitter => {
    ws.onopen = function () {
      emitter(connect());
    };

    ws.onclose = function (event) {
      emitter(disconnect(event));
    };

    ws.onerror = function (event) {
      emitter(onError(event));
    };

    ws.onmessage = function (event) {
      if (!event.data) {
        return;
      }

      const parsedData = JSON.parse(event.data);

      if (
        [BOOK_UI_FEED, BOOK_UI_FEED_SNAPSHOT].includes(parsedData.feed) &&
        parsedData.asks &&
        parsedData.bids
      ) {
        emitter(emitPriceFeed(parsedData));
      }
    };

    return ws.close;
  });

function* listenServerSaga(action: StartListeningAction) {
  const {payload} = action;

  const ws = new WebSocket(payload);

  yield put(initWebSocketsInstance(ws));
  const channel: EventChannel<Action> = yield call(createWebSocketsChannel, ws);

  while (true) {
    const eventAction: Action = yield take(channel);
    yield put(eventAction);
  }
}

function* subscribeToPriceFeedSaga(action: SubscribeToPriceFeedAction) {
  const {payload} = action;

  const ws: WebSocket | null = yield select(webSocket);

  if (ws !== null) {
    ws.send(webSocketsUtils.createBookSubscribeMessage(payload));
  }
}

function* unsubscribeFromPriceFeedSaga(action: UnsubscribeFromPriceFeedAction) {
  const {payload} = action;

  const ws: WebSocket | null = yield select(webSocket);

  if (ws !== null) {
    ws.send(webSocketsUtils.createBookUnsubscribeMessage(payload));
  }
}

function* closeConnectionSaga() {
  const ws: WebSocket | null = yield select(webSocket);

  if (ws !== null) {
    ws.close();
  }
}

export default [
  takeEvery(WebSocketsAction.StartListening, listenServerSaga),
  takeEvery(WebSocketsAction.SubscribeToPriceFeed, subscribeToPriceFeedSaga),
  takeEvery(
    WebSocketsAction.UnsubscribeFromPriceFeed,
    unsubscribeFromPriceFeedSaga,
  ),
  takeEvery(WebSocketsAction.CloseConnection, closeConnectionSaga),
];
