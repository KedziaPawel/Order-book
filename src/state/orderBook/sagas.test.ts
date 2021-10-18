import {runSaga} from 'redux-saga';
import {Action} from 'redux';
import {
  BOOK_UI_FEED_SNAPSHOT,
  BOOK_UI_FEED,
  DEFAULT_PI_SYMBOL,
} from '@app/consts';
import {PriceFeed, PriceSize} from '@app/types';
import {setPriceSizesSaga} from './sagas';
import {initialState, OrderBookState} from './reducer';
import {NAME} from './consts';
import {actions as webSocketsActions} from '../webSockets';

describe('order book sagas', () => {
  describe('setPriceSizesSaga', () => {
    const runMockedSaga = (dispatched: Action[], payload: PriceFeed) =>
      // Saga seems to have got incorrect typing, it expects iterator type while saga is generator
      runSaga<Action, {orderBook: OrderBookState}, any>(
        {
          dispatch: (action: Action) => dispatched.push(action),
          getState: () => ({[NAME]: initialState}),
        },
        setPriceSizesSaga,
        {
          type: webSocketsActions.WebSocketsAction.EmitPriceFeed,
          payload,
        },
      ).toPromise();

    const MOCKED_PRICE_BIDS: PriceSize[] = [
      [3213, 3],
      [4326, 35],
      [4322, 43],
    ];

    const MOCKED_PRICE_ASKS: PriceSize[] = [
      [3253, 3],
      [4726, 35],
      [4222, 43],
    ];

    it('should dispatch setPriceSizes with price sizes map when snapshot feed event is received', async () => {
      const dispatched: Action[] = [];
      await runMockedSaga(dispatched, {
        feed: BOOK_UI_FEED_SNAPSHOT,
        bids: MOCKED_PRICE_BIDS,
        asks: MOCKED_PRICE_ASKS,
        product_id: DEFAULT_PI_SYMBOL,
      });

      expect(dispatched).toEqual([
        {
          payload: {
            asks: {
              '3253': 3,
              '4222': 43,
              '4726': 35,
            },
            bids: {
              '3213': 3,
              '4322': 43,
              '4326': 35,
            },
          },
          type: 'OrderBook/SetPriceSizes',
        },
      ]);
    });

    it('should dispatch setCachedPriceSizes with price sizes map when snapshot feed event is received', async () => {
      const dispatched: Action[] = [];
      await runMockedSaga(dispatched, {
        feed: BOOK_UI_FEED,
        bids: MOCKED_PRICE_BIDS,
        asks: MOCKED_PRICE_ASKS,
        product_id: DEFAULT_PI_SYMBOL,
      });

      expect(dispatched).toEqual([
        {
          payload: {
            asks: {
              '3253': 3,
              '4222': 43,
              '4726': 35,
            },
            bids: {
              '3213': 3,
              '4322': 43,
              '4326': 35,
            },
          },
          type: 'OrderBook/SetCachedPriceSizes',
        },
      ]);
    });

    it('should not dispatch any action when event with not current product_id is received', async () => {
      const dispatched: Action[] = [];

      await runMockedSaga(dispatched, {
        feed: BOOK_UI_FEED,
        bids: MOCKED_PRICE_BIDS,
        asks: MOCKED_PRICE_ASKS,
        product_id: 'NOT_CURRENTLY_SELECTED_PRODUCT_ID',
      });

      expect(dispatched).toEqual([]);
    });

    it('should not dispatch any action when event with wrong feed is received', async () => {
      const dispatched: Action[] = [];

      await runMockedSaga(dispatched, {
        feed: 'WRONG_FEED',
        bids: MOCKED_PRICE_BIDS,
        asks: MOCKED_PRICE_ASKS,
        product_id: DEFAULT_PI_SYMBOL,
      });

      expect(dispatched).toEqual([]);
    });
  });
});
