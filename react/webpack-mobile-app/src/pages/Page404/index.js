import React from 'react';
import ViewConfig from '../../components/ViewConfig';
import Link from '../../components/Link';
import './index.less';

class Page404 extends React.PureComponent {
  render () {
    return (
      <section className="modifyPassword">
        <ViewConfig documentTitle="页面未找到"/>
        <div className="page404Wrap">404 NOT FOUND, 点击回<Link to="/">首页</Link>继续浏览</div>
      </section>
    )
  }
}

export default Page404;