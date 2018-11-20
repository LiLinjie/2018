import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import './index.css';
import { Provider } from 'react-redux';
import routers from './pages/routers';
import './utils/enhancers';
import createStore from './createStore';
import { browserHistory  } from 'react-router'
import registerServiceWorker from './registerServiceWorker';

const { store } = createStore(window.__INITIAL_STATE__ || {}, browserHistory);

ReactDOM.render((
  <Provider store={store}>
    <LocaleProvider locale={zh_CN}>
      {routers}
    </LocaleProvider>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
