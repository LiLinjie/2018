import { fromJS, List, Map } from 'immutable';
import * as types from '../../constants/types';

const initialEditorState = fromJS({
  editing: false,
  submitting: false,
  editorName: '',
  wrapClassName: '',
  width: 520,
  initialValues: {},
  newValues: {}
});

export default function (state = Map(), {type, payload}) {
  switch (type) {
    case types.EDITOR_START_EDIT:
      return state.set(
        payload.key,
        initialEditorState.merge({
          editing: true,
          wrapClassName: payload.wrapClassName,
          width: payload.width,
          editorName: payload.name || '',
          initialValues: payload.initialValues || {}
        })
      );
    case types.EDITOR_END_EDIT:
      return state.mergeIn([payload.key], {editing: false});
    case types.EDITOR_SET_INITIAL_VALUES:
      return state.setIn([payload.key, 'initialValues'], fromJS(payload.values));
    case types.EDITOR_RESET_VALUES:
      return state.setIn([payload.key, 'newValues'], Map());
    case types.EDITOR_UPDATE_VALUES:
      return state.mergeIn([payload.key, 'newValues'], payload.values);
    case types.EDITOR_SUBMIT_EDIT:
      return state.mergeIn([payload.key], {submitting: true});
    case types.EDITOR_END_SUBMIT:
      return state.mergeIn([payload.key], {submitting: false});
    default:
      return state;
  }
}
