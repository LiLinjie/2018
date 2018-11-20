import React from 'react';
import './index.less';
import { taskDetailTrace, } from '../../../constants/tasks'

// 埋点
function traceCount() {
  taskDetailTrace.goContact();
}

const ContactService = () => {
  return (
    <a onClick={traceCount} href="http://tt5.xuanwonainiu.com/common-api/alaisH5/landingPage/183/e9a9804358374de08772ff9e2d8b2f29" className="supended-contact"></a>
  )
}

export default ContactService;