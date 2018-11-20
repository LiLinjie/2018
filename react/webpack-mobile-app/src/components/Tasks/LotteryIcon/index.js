import React from 'react';
import './index.less';

const LotteryIcon = (props) => {
  const { code, mode } = props;
  return (
    <a href={`/lottery?code=${code}&mode=${mode}`} className="lottery-icon">
      <img src="http://img-cows.kkkd.com/FqTaXzYvUViR5GZ1C2JhOHHwVxfH" className="lottery-icon-cover" alt=""/>
      <div className="lottery-icon-bg">
        <img src="http://img-cows.kkkd.com/Fk7aVsXWC7CPSsdK2TEp846W0Ip4" className="lottery-icon-content" alt=""/>
      </div>
    </a>
  )
};

export default LotteryIcon;
