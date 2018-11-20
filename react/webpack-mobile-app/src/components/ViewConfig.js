import React from 'react';
import { connect } from 'react-redux';
import * as types from '../constants/actionTypes'
import PropTypes from 'prop-types'

@connect((state) => {
  return {
  };
}, dispatch => ({
  setViewConfig ({
    documentTitle,
    activeItem,
    shareData
  }) {
    dispatch({
      type: types.SET_VIEW_CONFIG,
      payload: {
        documentTitle,
        activeItem,
        shareData
      }
    })
  }
}))
export default class ViewConfig extends React.PureComponent {
  componentWillMount () {
    this.updateConfig(this.props);
  }

  componentWillReceiveProps (nextProps) {
    let hasChange = false;
    // ['setViewConfig', 'documentTitle', 'shareData', 'activeItem'].forEach(key => {
    //   if (nextProps[key] !== this.props[key]) {
    //     console.log(nextProps[key])
    //     hasChange = true;
    //   }
    // });
    if (nextProps.shareData && this.props.shareData) {
      Object.keys(nextProps.shareData).forEach(key => {
        if (nextProps.shareData[key] !== this.props.shareData[key]) {
          hasChange = true;
        }
      });
    }
    if (hasChange) {
      this.updateConfig(nextProps);
    }
  }

  updateConfig (props) {
    const { setViewConfig, ...configs } = props;
    this.props.setViewConfig(configs);
  }

  render () {
    return null;
  }
}

ViewConfig.propTypes = {
  setViewConfig: PropTypes.func,
  documentTitle: PropTypes.string,
  shareData: PropTypes.object,
  activeItem: PropTypes.string
}