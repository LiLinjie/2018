import React from 'react';
import { Link } from 'react-router';
import './index.less';
import { Layout, Menu, Breadcrumb, Icon, BackTop } from 'antd';
import Header from '../Header';
import { MENU } from '../../constants';

const { Content, Sider } = Layout;

export default class HomeLayout extends React.PureComponent {
  render () {
    return (
      <Layout className="layout">
        <Header />
        <Layout>
          <Sider width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              {
                MENU.map((i,idx) => {
                  return (
                    <Menu.Item key={idx}>
                      {
                        i.url
                          ? <Link to={i.url}>{i.icon && <Icon type={i.icon}/>} {i.name}</Link>
                          : i.name
                      }
                    </Menu.Item>
                  )
                })
              }
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ background: '#fff', padding: 24, margin: 0 }}>
              Content
              <BackTop />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}
