import React from 'react';

function LotteryItem ({activeId, content, index}) {
  return (
    <div className={activeId === index ? 'lottery-item active' : 'lottery-item'}>
      <div className="img flex justify-center items-center">
        <img src={content.imgUrl} alt={content.name} style={{width: content.width}}/>
      </div>
      <p>{content.name}</p>
    </div>
  )
}

export default LotteryItem;
