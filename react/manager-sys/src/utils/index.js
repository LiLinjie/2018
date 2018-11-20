import qs from 'qs';

export function valuesToFormFields (values) {
  if (values) {
    if (values.toJS) {
      values = values.toJS();
    }

    let fields = {};
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        fields[key] = {value: values[key]};
      }
    }
    return fields;
  } else {
    return {};
  }
}

export function getPrice (_price) {
  return _price ? (_price/100).toFixed(2) : 0;
}

export function getUrlQuery () {
  const { search, hash } = window.location;
  let searchStr = search.substring(1);
  if (!searchStr && hash) {
    const match = hash.match(/^#.*?\?(.*)$/);
    if (match) {
      searchStr = match[1];
    }
  }
  return qs.parse(searchStr);
}

export function showTotal (total) {
  return `一共 ${total} 条数据`;
}
