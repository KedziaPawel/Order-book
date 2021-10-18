import {PriceFeed} from '@app/types';

export enum WebSocketsAction {
  StartListening = 'webSockets/StartListening',
  InitWebSocketsInstance = 'webSockets/InitWebSocketsInstance',
  Connect = 'webSockets/Connect',
  Disconnect = 'webSockets/Disconnect',
  EmitPriceFeed = 'webSockets/EmitPriceFeed',
  OnError = 'webSockets/OnError',
  SubscribeToPriceFeed = 'webSockets/SubscribeToPriceFeed',
  UnsubscribeFromPriceFeed = 'webSockets/UnsubscribeFromPriceFeed',
  CloseConnection = 'webSockets/CloseConnection',
}

export interface StartListeningAction {
  type: WebSocketsAction.StartListening;
  payload: string;
}

export interface InitWebSocketsInstanceAction {
  type: WebSocketsAction.InitWebSocketsInstance;
  payload: WebSocket;
}

export interface ConnectAction {
  type: WebSocketsAction.Connect;
}

export interface DisconnectAction {
  type: WebSocketsAction.Disconnect;
  payload: WebSocketCloseEvent;
}

export interface EmitPriceFeedAction {
  type: WebSocketsAction.EmitPriceFeed;
  payload: PriceFeed;
}

export interface OnErrorAction {
  type: WebSocketsAction.OnError;
  payload: WebSocketErrorEvent;
}

export interface SubscribeToPriceFeedAction {
  type: WebSocketsAction.SubscribeToPriceFeed;
  payload: string;
}

export interface UnsubscribeFromPriceFeedAction {
  type: WebSocketsAction.UnsubscribeFromPriceFeed;
  payload: string;
}

export interface CloseConnectionAction {
  type: WebSocketsAction.CloseConnection;
}

export type WebSocketsActionType =
  | StartListeningAction
  | InitWebSocketsInstanceAction
  | ConnectAction
  | DisconnectAction
  | EmitPriceFeedAction
  | OnErrorAction
  | SubscribeToPriceFeedAction
  | UnsubscribeFromPriceFeedAction
  | CloseConnectionAction;

export const startListening = (url: string): StartListeningAction => ({
  type: WebSocketsAction.StartListening,
  payload: url,
});

export const initWebSocketsInstance = (
  webSocket: WebSocket,
): InitWebSocketsInstanceAction => ({
  type: WebSocketsAction.InitWebSocketsInstance,
  payload: webSocket,
});

export const connect = (): ConnectAction => ({
  type: WebSocketsAction.Connect,
});

export const disconnect = (event: WebSocketCloseEvent): DisconnectAction => ({
  type: WebSocketsAction.Disconnect,
  payload: event,
});

export const emitPriceFeed = (priceFeed: PriceFeed): EmitPriceFeedAction => ({
  type: WebSocketsAction.EmitPriceFeed,
  payload: priceFeed,
});

export const onError = (error: WebSocketErrorEvent): OnErrorAction => ({
  type: WebSocketsAction.OnError,
  payload: error,
});

export const subscribeToPriceFeed = (
  productId: string,
): SubscribeToPriceFeedAction => ({
  type: WebSocketsAction.SubscribeToPriceFeed,
  payload: productId,
});

export const unsubscribeFromPriceFeed = (
  productId: string,
): UnsubscribeFromPriceFeedAction => ({
  type: WebSocketsAction.UnsubscribeFromPriceFeed,
  payload: productId,
});

export const closeConnection = (): CloseConnectionAction => ({
  type: WebSocketsAction.CloseConnection,
});
