import {PriceSizesMap} from '@app/types';

export enum OrderBookAction {
  SetPriceSizes = 'OrderBook/SetPriceSizes',
  SetCachedPriceSizes = 'OrderBook/SetCachedPriceSizes',
  MoveCachedPriceSizesToMain = 'OrderBook/MoveCachedPriceSizesToMain',
  ChangeProductId = 'OrderBook/ChangeProductId',
  SetProductId = 'OrderBook/SetProductId',
  SubscribeProductId = 'OrderBook/SubscribeProductId',
  UnsubscribeProductId = 'OrderBook/UnsubscribeProductId',
  SetTicketSize = 'OrderBook/SetTicketSize',
  OnError = 'OrderBook/OnError',
}

interface SetPriceSizesActionPayload {
  bids: PriceSizesMap;
  asks: PriceSizesMap;
}

export interface SetPriceSizesAction {
  type: OrderBookAction.SetPriceSizes;
  payload: SetPriceSizesActionPayload;
}

export interface SetCachedPriceSizesAction {
  type: OrderBookAction.SetCachedPriceSizes;
  payload: SetPriceSizesActionPayload;
}

export interface MoveCachedPriceSizesToMainAction {
  type: OrderBookAction.MoveCachedPriceSizesToMain;
}

export interface ChangeProductIdAction {
  type: OrderBookAction.ChangeProductId;
  payload: string;
}

export interface SetProductIdAction {
  type: OrderBookAction.SetProductId;
  payload: string;
}

export interface SubscribeProductIdAction {
  type: OrderBookAction.SubscribeProductId;
  payload: string;
}

export interface UnsubscribeProductIdAction {
  type: OrderBookAction.UnsubscribeProductId;
  payload: string;
}

export interface OnErrorAction {
  type: OrderBookAction.OnError;
  payload: string;
}

export interface SetTicketSizeAction {
  type: OrderBookAction.SetTicketSize;
  payload: number;
}

export type OrderBookActionType =
  | SetPriceSizesAction
  | SetCachedPriceSizesAction
  | MoveCachedPriceSizesToMainAction
  | ChangeProductIdAction
  | SetProductIdAction
  | SubscribeProductIdAction
  | UnsubscribeProductIdAction
  | SetTicketSizeAction
  | OnErrorAction;

export const setPriceSizes = (
  payload: SetPriceSizesActionPayload,
): SetPriceSizesAction => ({
  type: OrderBookAction.SetPriceSizes,
  payload,
});

export const setCachedPriceSizes = (
  payload: SetPriceSizesActionPayload,
): SetCachedPriceSizesAction => ({
  type: OrderBookAction.SetCachedPriceSizes,
  payload,
});

export const moveCachedPriceSizesToMain =
  (): MoveCachedPriceSizesToMainAction => ({
    type: OrderBookAction.MoveCachedPriceSizesToMain,
  });

export const changeProductId = (symbol: string): ChangeProductIdAction => ({
  type: OrderBookAction.ChangeProductId,
  payload: symbol,
});

export const setProductId = (symbol: string): SetProductIdAction => ({
  type: OrderBookAction.SetProductId,
  payload: symbol,
});

export const subscribeProductId = (
  productId: string,
): SubscribeProductIdAction => ({
  type: OrderBookAction.SubscribeProductId,
  payload: productId,
});

export const unsubscribeProductId = (
  productId: string,
): UnsubscribeProductIdAction => ({
  type: OrderBookAction.UnsubscribeProductId,
  payload: productId,
});

export const setTicketSize = (ticketSize: number): SetTicketSizeAction => ({
  type: OrderBookAction.SetTicketSize,
  payload: ticketSize,
});

export const onError = (error: string): OnErrorAction => ({
  type: OrderBookAction.OnError,
  payload: error,
});
