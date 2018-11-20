import * as types from '../constants/types';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

class ViewConfig extends React.PureComponent {
  componentWillMount () {
    this.setConfig(this.props);
  }

  componentWillReceiveProps (nextProps) {
    this.setConfig(nextProps);
  }

  setConfig (props) {
    const {
      updateConfig,
      title,
      subTitle,
      activeMenu,
      activeSubMenu,
      hideBreadcrumb = false,
      hideLeftMenu,
      verticalMenu,
      horizontalMenu,
      bg = true,
      theme,
    } = props;
    updateConfig({
      title,
      subTitle,
      activeMenus: [activeMenu],
      activeSubMenu: [activeSubMenu],
      hideBreadcrumb,
      bg,
      theme,
      verticalMenu,
      hideLeftMenu,
      horizontalMenu,
    });
  }

  render () {
    return null;
  }
}

ViewConfig.propTypes = {
  title: PropTypes.node.isRequired,
  subTitle: PropTypes.node,
  theme: PropTypes.string,
  verticalMenu: PropTypes.bool,
  activeMenu: PropTypes.string,
  activeSubMenu: PropTypes.string,
  updateConfig: PropTypes.func,
  bg: PropTypes.bool,
};

ViewConfig = connect(
  (state) => ({}),
  (dispatch) => ({
    updateConfig: (config) => {
      dispatch({
        type: types.VIEW_CONFIG_UPDATE,
        payload: config
      });
    }
  })
)(ViewConfig);

export default ViewConfig;
