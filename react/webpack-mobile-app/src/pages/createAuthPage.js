import React from 'react';
import { connect } from 'react-redux';
import * as types from '../constants/actionTypes';
import Loading from '../components/Loading';

export default function (WrappedComponent) {
  @connect(
    (state) => {
      return {
        userId: state.getIn(['user','userInfo', 'userId'])
      };
    },
    (dispatch) => ({
      getUserInfo () {
        dispatch({type: types.TASKS_WANGZHUAN_USER_INFO_REQUEST});
      }
    })
  )
  class AuthPageWrapper extends React.PureComponent {
    componentWillMount () {
      if (!this.props.userId) {
        this.props.getUserInfo();
      }
    }
    render () {
      const { userId, ...otherProps } = this.props;
      if (userId) {
        return <WrappedComponent {...otherProps}/>;
      } else {
        return <Loading />;
      }
    }
  }

  return AuthPageWrapper;
}
