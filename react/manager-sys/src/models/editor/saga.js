import { put, select, take, call } from 'redux-saga/effects';
import * as types from '../../constants/types';

export function * startEdit (options) {
  const {key, name, width, wrapClassName, initialValues, onSubmit} = options;
  let {closeAfterSubmit} = options;
  yield put({
    type: types.EDITOR_START_EDIT, payload: {
      key,
      name,
      width,
      wrapClassName,
      initialValues,
      onSubmit
    }
  });

  while (1) {
    const action = yield take([types.EDITOR_SUBMIT_EDIT, types.EDITOR_END_EDIT]);
    const editorKey = action.payload.key;

    if (editorKey !== key) {
      continue;
    }

    const isSubmit = action.type === types.EDITOR_SUBMIT_EDIT;
    const isEnd = action.type === types.EDITOR_END_EDIT;
    if (isEnd) {
      return {
        isSubmit,
        values: {}
      };
    }
    let values = null;
    if (isSubmit) {
      values = yield select(s => {
        const editorState = s.get('editor');
        const initialValues = editorState.getIn([key, 'initialValues']);
        const newValues = editorState.getIn([key, 'newValues']);

        return initialValues.merge(newValues).toJS();
      });

      if (onSubmit) {
        try {
          closeAfterSubmit = yield call(onSubmit, values);
        } catch (err) {
          continue;
        } finally {
          yield put({type: types.EDITOR_END_SUBMIT, payload: {key}});
        }
      }
    }

    if (closeAfterSubmit) {
      yield put({type: types.EDITOR_END_EDIT, payload: {key}});

      return {
        isSubmit,
        values
      };
    }
  }
}

export default function * () {

}
