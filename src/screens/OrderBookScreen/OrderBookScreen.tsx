import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  actions as orderBookActions,
  selectors as orderBookSelectors,
} from '@app/state/orderBook';
import {PI_XBTUSD_SYMBOL, PI_ETHUSD_SYMBOL, WEB_SOCKETS_URL} from '@app/consts';

import {
  selectors as webSocketsSelectors,
  actions as webSocketsActions,
} from '@app/state/webSockets';

import OrderBookView from './OrderBookView';

const OrderBookScreen = () => {
  const dispatch = useDispatch();
  const productId = useSelector(orderBookSelectors.productId);

  const asks = useSelector(orderBookSelectors.groupedAsks);

  const bids = useSelector(orderBookSelectors.groupedBids);

  const currentTicketSize = useSelector(orderBookSelectors.ticketSize);

  const availableTicketSizes = useSelector(
    orderBookSelectors.availableTicketSizes,
  );

  const isConnected = useSelector(webSocketsSelectors.isConnected);

  const websocketsError = useSelector(webSocketsSelectors.error);

  useEffect(() => {
    if (isConnected && productId) {
      dispatch(orderBookActions.subscribeProductId(productId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isConnected]);

  useEffect(
    () => () => {
      if (productId) {
        dispatch(orderBookActions.unsubscribeProductId(productId));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );

  const toggleFeed = () => {
    const newProductId =
      productId === PI_XBTUSD_SYMBOL ? PI_ETHUSD_SYMBOL : PI_XBTUSD_SYMBOL;
    dispatch(orderBookActions.changeProductId(newProductId));
  };

  const setTicketSize = (newTicketSize: number) => {
    dispatch(orderBookActions.setTicketSize(newTicketSize));
  };

  const closeConnection = () => {
    dispatch(webSocketsActions.closeConnection());
  };

  const connectToWebsockets = () => {
    dispatch(webSocketsActions.startListening(WEB_SOCKETS_URL));
  };

  return (
    <OrderBookView
      toggleFeed={toggleFeed}
      currentTicketSize={currentTicketSize}
      availableTicketSizes={availableTicketSizes}
      setTicketSize={setTicketSize}
      killFeed={websocketsError ? connectToWebsockets : closeConnection}
      connectionError={websocketsError}
      asks={asks}
      bids={bids}
    />
  );
};

export default OrderBookScreen;
