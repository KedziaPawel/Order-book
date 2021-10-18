import {combineReducers} from 'redux';
import {
  reducer as webSocketsReducer,
  consts as webSocketsConsts,
  actions as webSocketsActions,
} from './webSockets';

import {
  reducer as orderBookReducer,
  consts as orderBookConsts,
  actions as orderActions,
} from './orderBook';

export interface ApplicationState {
  [webSocketsConsts.NAME]: webSocketsReducer.WebSocketsState;
  [orderBookConsts.NAME]: orderBookReducer.OrderBookState;
}

export type GlobalActionType =
  | webSocketsActions.WebSocketsActionType
  | orderActions.OrderBookActionType;

export const rootReducer = combineReducers({
  [webSocketsConsts.NAME]: webSocketsReducer.reducer,
  [orderBookConsts.NAME]: orderBookReducer.reducer,
});
