import { combineReducers } from 'redux-immutable';

const sagas = [];
const reducers = [];

function addReducerAndSaga (model) {
  model.reducer && reducers.push({name: model.name, reducer: model.reducer });
  model.saga && sagas.push(model.saga);
}

addReducerAndSaga(require('./lottery'));
addReducerAndSaga(require('./viewConfig'));
addReducerAndSaga(require('./user'));
addReducerAndSaga(require('./tasks'));

export default {
  reducers: combineReducers(reducers.reduce((p, c) => {
    p[c.name] = c.reducer;
    return p;
  }, {})),
  sagas
}
