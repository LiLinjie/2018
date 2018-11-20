'use extensible';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import './index.less';
import { Layout, Menu, Breadcrumb, Icon, BackTop } from 'antd';
import Header from '../Header';
import { MENU } from '../../constants';
import * as types from '../../constants/types';

const { Content, Sider } = Layout;

function itemRender(route, params, routes, paths) {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
}

@connect (state => {
  return {
    viewConfig: state.getIn(['viewConfig', 'viewConfig']),
    baseInfo: state.getIn(['user', 'baseInfo'])
  }
}, (dispatch) => ({
  logout () {
    dispatch({type: types.USER_LOGOUT_REQUEST});
  },
}))
export default class HomeLayout extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      collapsed: false
    }
  }
  render () {
    const { routes, params, children, viewConfig, logout, baseInfo } = this.props;
    const { name } = baseInfo;
    const { activeMenus, activeSubMenu, theme } = viewConfig.toJS();
    const menuProps = {
      mode: 'inline',
      theme: theme || 'light',
      style: { height: '100%', borderRight: 0 },
      openKeys: activeMenus,
      selectedKeys: activeSubMenu
    };
    return (
      <Layout className="layout">
        <Header handleLogout={logout} name={name} />
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => { console.log(broken); }}
            onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
          >
            <Menu {...menuProps}
            >
              {
                MENU.map(i => {
                  return (
                    <Menu.Item key={i.code}>
                      {
                        i.url ?
                          <Link to={i.url}><Icon type={i.icon}/>{i.name}</Link>
                          :
                          <div><Icon type={i.icon}/><span>{i.name}</span></div>
                      }
                    </Menu.Item>
                  )
                })
              }
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px' }}>
            <Breadcrumb separator=">" style={{ margin: '16px 0' }} routes={routes} params={params} itemRender={itemRender} />
            <Content style={{ background: '#fff', padding: 24, margin: 0 }}>
              {children}
              <BackTop />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}
