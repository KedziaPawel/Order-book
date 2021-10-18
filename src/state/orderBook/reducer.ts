import {DEFAULT_PI_SYMBOL, PIs} from '@app/consts';
import {OrderBookAction, OrderBookActionType} from './actions';
import {PriceSizesMap} from '@app/types';

export interface OrderBookState {
  productId: string;
  bids: PriceSizesMap;
  asks: PriceSizesMap;
  cachedBids: PriceSizesMap;
  cachedAsks: PriceSizesMap;
  ticketSize: number;
  error: string;
}

export const initialState: OrderBookState = {
  productId: DEFAULT_PI_SYMBOL,
  bids: {},
  asks: {},
  cachedBids: {},
  cachedAsks: {},
  ticketSize: PIs[DEFAULT_PI_SYMBOL].ticketSizes[0],
  error: '',
};

export const reducer = (
  state = initialState,
  action: OrderBookActionType,
): OrderBookState => {
  switch (action.type) {
    case OrderBookAction.SetProductId:
      return {
        ...state,
        productId: action.payload,
        ticketSize: PIs[action.payload].ticketSizes[0],
        bids: {},
        asks: {},
        cachedBids: {},
        cachedAsks: {},
      };
    case OrderBookAction.UnsubscribeProductId:
      return initialState;
    case OrderBookAction.SetTicketSize:
      return {
        ...state,
        ticketSize: action.payload,
      };
    case OrderBookAction.OnError:
      return {
        ...state,
        error: action.payload,
      };
    case OrderBookAction.MoveCachedPriceSizesToMain:
      return {
        ...state,
        bids: {...state.bids, ...state.cachedBids},
        asks: {...state.asks, ...state.cachedAsks},
        cachedBids: {},
        cachedAsks: {},
      };
    case OrderBookAction.SetPriceSizes:
      return {
        ...state,
        bids: {...state.bids, ...action.payload.bids},
        asks: {...state.asks, ...action.payload.asks},
      };
    case OrderBookAction.SetCachedPriceSizes:
      return {
        ...state,
        cachedBids: {...state.cachedBids, ...action.payload.bids},
        cachedAsks: {...state.cachedAsks, ...action.payload.asks},
      };
    default:
      return state;
  }
};
