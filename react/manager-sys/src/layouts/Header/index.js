'use extensible';

import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { Icon, Menu } from 'antd';
import {Link} from 'react-router';
// import Deliver from '../../components/Deliver';
import { webSiteName } from '../../config';

const SubMenu = Menu.SubMenu;

class Header extends React.PureComponent {
  render () {
    let {
      name,
      handleLogout,
    } = this.props;
    const title = (
      <div>
        <div style={{ height: '48px' }}>
          <Icon type="user" />
          <span style={{ color: '#999', marginLeft: '8px' }}>{name}</span>
        </div>
      </div>
    );
    return (
      <header className="sys-header">
        <Link to="/" className="left-wrapper">{webSiteName}</Link>
        {
          <div className="right-wrapper">
            <Menu mode="horizontal" onClick={handleLogout}>
              <SubMenu style={{float: 'right'}} title={title}>
                <Menu.Item key="logout">
                  <a>注销</a>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </div>
        }
      </header>
    )
  }
}

Header.propTypes = {
  sys: PropTypes.object,
  handleLogout: PropTypes.func
};

export default Header
