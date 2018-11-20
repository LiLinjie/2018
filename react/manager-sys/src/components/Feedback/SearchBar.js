import React from 'react';
import SearchBar from '../common/createSearchForm';
const types = [];
const status = [];

function getSearchKeys ({ initialValues }) {
  const searchKeys = [
    {
      key: 'type',
      label: '反馈类型',
      options: {
        initialValues: initialValues.type,
      },
      selects: types,
      type: 'select'
    },
    {
      key: 'dateRanger',
      label: '反馈时间',
      options: {
        startKey: 'startSearch',
        endKey: 'endSearch',
        start: initialValues.startSearch,
        end: initialValues.endSearch
      },
      props: {
        format: 'YYYY-MM-DD'
      },
      type: 'dateRange',
    },
    {
      key: 'dealStatus',
      label: '状态',
      options: {
        initialValue: initialValues.dealStatus,
      },
      props: {
        // mode: 'multiple', // 如果有此配置则为多选
        showSearch: true, // 如果有此配置则可搜索
      },
      selects: status,
      type: 'select',
    },
  ];
  return searchKeys;
}

const FeedbackSearchBar = (props) => {
  const {
    handleSearch,
    ...otherProps
  } = props;
  return (
    <SearchBar
      searchKeys={getSearchKeys(otherProps)}
      handleSearch={handleSearch}
      handleReset={handleSearch}
    />
  )
};

export default FeedbackSearchBar;
