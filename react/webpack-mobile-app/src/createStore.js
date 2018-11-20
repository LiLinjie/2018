import { fromJS } from 'immutable';
import { applyMiddleware, compose, createStore } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware, { END } from 'redux-saga';
import { fork, takeEvery } from 'redux-saga/effects';

import originModels from './models';
const sagaMiddleware = createSagaMiddleware();

let models = originModels;

const store = createStore(
  models.reducers,
  window.devToolsExtension ? window.devToolsExtension() : undefined,    // dev-tools
  applyMiddleware(sagaMiddleware)
);

store.runSaga = sagaMiddleware.run;
store.close = () => {
  store.dispatch(END);
};

function runRootSaga () {
  if (models && models.sagas) {
    store.runSaga(function * () {
      yield models.sagas.map(saga => fork(saga));
    }).done.catch(e => {
      console.error(e.message || e);
      runRootSaga();
    });
  }
}

store.runSaga(function * () {
  yield takeEvery('*', (action) => {
    console.info('[action] ' + action.type);
  });
});
runRootSaga();

export default store;
