import React from 'react';
import SearchBar from '../common/createSearchForm';

function getSearchKeys ({ initialValues }) {
  const searchKeys = [
    {
      key: 'url',
      label: '素材',
      options: {
        initialValue: initialValues.url,
      },
      type: 'string',
    },
    {
      key: 'name',
      label: '广告名称',
      options: {
        initialValue: initialValues.name
      },
      type: 'string'
    },
    {
      key: 'nickName',
      label: '完成者'
    },
    {
      key: 'employee',
      label: '负责人',
    },
    {
      key: 'adCreateTime',
      label: '创建时间',
      options: {
        startKey: 'createStartTime',
        endKey: 'createEndTime',
        start: initialValues.createStartTime,
        end: initialValues.createEndTime,
        startOf: 'day'
      },
      props: {
        format: 'YYYY-MM-DD'
      },
      type: 'dateRange',
    }
  ];
  return searchKeys;
}

const AdSearchBar = (props) => {
  const {
    handleSearch,
    ...otherProps
  } = props;

  return (
    <SearchBar
      searchKeys={getSearchKeys(otherProps)}
      open={true}
      handleSearch={handleSearch}
      handleReset={handleSearch}
    />
  )
};

export default AdSearchBar;
