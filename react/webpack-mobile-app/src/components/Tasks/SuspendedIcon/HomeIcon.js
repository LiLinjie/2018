import React from 'react';
import './index.less';
import { taskDetailTrace, } from '../../../constants/tasks'

// 埋点
function traceCount() {
  taskDetailTrace.goHome();
}

const HomeIcon = (props) => {
  const { code, mode, fromPage, } = props;

  return (
    <a onClick={traceCount} href={`${window.location.protocol}//${window.location.host}/tasks?code=${code || '507'}&mode=${mode}&fromPage=${fromPage}`} className="supended-back"></a>
  )
}

export default HomeIcon;