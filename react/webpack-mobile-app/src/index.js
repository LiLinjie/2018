import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import store from './createStore';

function bootstrap (App) {
  ReactDom.render(<App store={store} />, document.getElementById('app'));
}

bootstrap(App);

/*整个页面会刷新*/
// if (module.hot) {
//   module.hot.accept('./App', () => {
//     bootstrap(require('./App'));
//   });
// }

if (module.hot) {
  module.hot.accept();
}
