import {PI} from '@app/types';

export const WEB_SOCKETS_URL = 'wss://www.cryptofacilities.com/ws/v1';

export const PI_XBTUSD_SYMBOL = 'PI_XBTUSD';

export const PI_ETHUSD_SYMBOL = 'PI_ETHUSD';

export const PI_XBTUSD: PI = {
  symbol: PI_XBTUSD_SYMBOL,
  ticketSizes: [0.5, 1, 2.5],
};

export const PI_ETHUSD: PI = {
  symbol: 'PI_ETHUSD',
  ticketSizes: [0.05, 0.1, 0.25],
};

export const PIs: {[symbol: string]: PI} = {
  [PI_XBTUSD.symbol]: PI_XBTUSD,
  [PI_ETHUSD.symbol]: PI_ETHUSD,
};

export const DEFAULT_PI_SYMBOL = PI_XBTUSD.symbol;

export const BOOK_UI_FEED = 'book_ui_1';
export const BOOK_UI_FEED_SNAPSHOT = 'book_ui_1_snapshot';
