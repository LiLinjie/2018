import { combineReducers } from 'redux-immutable';
import * as reducer from './reducer';
import saga from './saga';

export default {
  name: 'editor',
  reducer: combineReducers(reducer),
  saga
}
