'use extensible';

import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { Icon, Menu } from 'antd';
import {Link} from 'react-router';
// import Deliver from '../../components/Deliver';

const SubMenu = Menu.SubMenu;

class Header extends React.PureComponent {
  render () {
    let {
      user,
      // hasNewAlarm,
      handleLogout,
      // sys,
    } = this.props;
    let userName = '';
    let photo = '';
    // if (typeof user ==='string') {
    //   userName = user
    // } else {
    //   userName = (user.get('name') || user.get('loginName') || user.get('username') || user.get('userName'));
    //   photo = user.get('photo');
    // }
    // const IS_PROD = ~window.location.host.indexOf('xuanwonainiu.com');
    const title = (
      <div>
        <div style={{ height: '48px' }}>
          {
            photo ? (
              <div style={{
                width: '28px',
                height: '28px',
                overflow: 'hidden',
                verticalAlign: '-10px',
                display: 'inline-block',
                borderRadius: '14px',
              }}>
                <img alt="" src={photo} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
              </div>
            ) : (<Icon type="user" />)
          }
          <span style={{ color: '#999', marginLeft: '8px' }}>{userName}</span>
        </div>
      </div>
    );
    return (
      <header className="sys-header">
        <Link to="/" className="left-wrap">网赚toB</Link>
        {
          <div className="right-wrap">
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
