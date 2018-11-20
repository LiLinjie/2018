import { combineReducers } from 'redux-immutable';
import viewConfig from './viewConfig';
import ad from './ad';
import router from './router';
import editor from './editor';
import user from './user';

const sagas = [];
const reducers = [];

function addReducerAndSaga (model) {
  model.reducer && reducers.push({name: model.name, reducer: model.reducer });
  model.saga && sagas.push(model.saga);
}

addReducerAndSaga(viewConfig);
addReducerAndSaga(ad);
addReducerAndSaga(router);
addReducerAndSaga(editor);
addReducerAndSaga(user);


export default {
  reducers: combineReducers(reducers.reduce((p, c) => {
    p[c.name] = c.reducer;
    return p;
  }, {})),
  sagas
}
