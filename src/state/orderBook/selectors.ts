import {createSelector} from 'reselect';
import {ApplicationState} from '@app/state/rootReducer';
import {PIs} from '@app/consts';
import {OrderBookState} from './reducer';
import {groupPriceSizes} from './utils';
const local = (state: ApplicationState): OrderBookState => state.orderBook;

export const productId = createSelector(local, state => state.productId);

export const ticketSize = createSelector(local, state => state.ticketSize);

export const availableTicketSizes = createSelector(productId, _productId =>
  PIs[_productId].ticketSizes.map(_ticketSize => ({
    value: _ticketSize,
    label: `Group ${_ticketSize}`,
  })),
);

export const asks = createSelector(local, state => state.asks);

export const bids = createSelector(local, state => state.bids);

export const groupedAsks = createSelector(
  asks,
  ticketSize,
  (_asks, _ticketSize) => groupPriceSizes(_asks, _ticketSize, 'asc'),
);

export const groupedBids = createSelector(
  bids,
  ticketSize,
  (_bids, _ticketSize) => groupPriceSizes(_bids, _ticketSize, 'desc'),
);
