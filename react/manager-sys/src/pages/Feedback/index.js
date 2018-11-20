import React from 'react';
import { connect } from 'react-redux';
import ViewConfig from '../../components/ViewConfig';
import SearchBar from '../../components/Feedback/SearchBar';
import {getUrlQuery} from '../../utils';

@connect(state => {
  return {

  }
}, (dispatch) => ({

}))
export default class Feedback extends React.PureComponent {
  handleSearch = (values) => {
    const { pathname } = this.props.location;
    const payload = {
      pathname,
      query: {
        ...getUrlQuery(),
        ...values,
        page: 0,
      },
    };
    this.props.handlePageChange(payload);
  };
  render () {
    const {
      ...otherQuerys
    } = getUrlQuery();
    return (
      <div>
        <ViewConfig title="用户反馈" subTitle="" activeMenu="FEEDBACK" activeSubMenu="FEEDBACK" />
        <SearchBar
          initialValues={otherQuerys}
          handleSearch={this.handleSearch}
        />
      </div>
    )
  }
}
