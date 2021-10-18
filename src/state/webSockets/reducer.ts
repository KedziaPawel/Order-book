import {WebSocketsAction, WebSocketsActionType} from './actions';
import {DEFAULT_CONNECTION_ERROR} from './consts';

export interface WebSocketsState {
  isConnected: boolean;
  webSocket: WebSocket | null;
  error: string;
}

const initialState: WebSocketsState = {
  isConnected: false,
  webSocket: null,
  error: '',
};

export const reducer = (
  state = initialState,
  action: WebSocketsActionType,
): WebSocketsState => {
  switch (action.type) {
    case WebSocketsAction.InitWebSocketsInstance:
      return {
        ...state,
        webSocket: action.payload,
      };
    case WebSocketsAction.Connect:
      return {
        ...state,
        isConnected: true,
        error: '',
      };
    case WebSocketsAction.Disconnect:
      return {
        ...state,
        isConnected: false,
        error: action.payload.reason || DEFAULT_CONNECTION_ERROR,
      };
    case WebSocketsAction.OnError:
      return {
        ...state,
        error: action.payload.message,
      };
    default:
      return state;
  }
};
