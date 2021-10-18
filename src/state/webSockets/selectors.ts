import {createSelector} from 'reselect';
import {ApplicationState} from '@app/state/rootReducer';
import {WebSocketsState} from './reducer';

const local = (state: ApplicationState): WebSocketsState => state.webSockets;

export const webSocket = createSelector(local, state => state.webSocket);

export const isConnected = createSelector(local, state => state.isConnected);

export const error = createSelector(local, state => state.error);
