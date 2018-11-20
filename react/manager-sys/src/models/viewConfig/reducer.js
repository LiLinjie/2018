import * as types from '../../constants/types';
import { fromJS, List, Map } from 'immutable';

export function viewConfig (state = fromJS({
  title: '',
  subTitle: '',
  verticalMenu: false,
  activeMenus: [],
  activeSubMenu: [],
  _activeMenus: [],
  hideBreadcrumb: false,
  foldMenu: false,
  bg: true
}), {type, payload}) {
  switch (type) {
    case types.VIEW_CONFIG_UPDATE:
      return state.set('hideBreadcrumb', false).merge(payload);
    case types.VIEW_CONFIG_CHANGE_MENU:
      return state.set('activeMenus', fromJS(payload));
    case types.VIEW_CONFIG_CHANGE_SUB_MENU:
      return state.set('activeSubMenu', fromJS(payload));
    default:
      return state;
  }
}
