import React from 'react';
import { Provider } from 'react-redux';
import getRouter from './routers';
import './less/main.less';
import './utils/alertTips';
import './utils/polyfills';
import animation from './utils/animation';
animation.init();

export default function App ({store}) {
  return (
    <Provider store={store}>
      {getRouter()}
    </Provider>
  )
}
