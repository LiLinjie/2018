import { combineReducers } from 'redux-immutable';
import * as reducer from './reducer';
import saga from './saga';

export default {
  name: 'user',
  reducer: combineReducers(reducer),
  saga
}
