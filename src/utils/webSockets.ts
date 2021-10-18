import {BOOK_UI_FEED} from '@app/consts';

export const createMessage = (
  _productId: string,
  event: string,
  feed: string,
) =>
  JSON.stringify({
    event,
    feed,
    product_ids: [_productId],
  });

export const createBookSubscriptionMessage = (
  _productId: string,
  event: 'unsubscribe' | 'subscribe',
) => createMessage(_productId, event, BOOK_UI_FEED);

export const createBookSubscribeMessage = (_productId: string) =>
  createBookSubscriptionMessage(_productId, 'subscribe');

export const createBookUnsubscribeMessage = (_productId: string) =>
  createBookSubscriptionMessage(_productId, 'unsubscribe');
