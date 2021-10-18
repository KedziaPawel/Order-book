import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {actions} from '@app/state/webSockets';
import {OrderBookScreen} from '@app/screens';

import {WEB_SOCKETS_URL} from '@app/consts';

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.startListening(WEB_SOCKETS_URL));
  }, [dispatch]);

  return <OrderBookScreen />;
};

export default Main;
