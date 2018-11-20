import * as types from '../../constants/types';
import { takeLatest } from 'redux-saga/effects';
import { webSiteName } from '../../config';

export function * updateDocumentTitle ({payload}) {
  if (payload.title) {
    document.title = `${payload.title} - ${webSiteName}`;
  } else {
    document.title = `${webSiteName}`;
  }
}

export default function * () {
  yield takeLatest(types.VIEW_CONFIG_UPDATE, updateDocumentTitle);
}
