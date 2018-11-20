import React, { PureComponent } from 'react';
import './index.less'
import { STATUS_CONFIG } from '../../../constants/tasks'
import Deliver from '../../Deliver'

export default class OrderMaterial extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      openStatus: false,
    }
  }

  displayMask = () => {
    const { openStatus } = this.state;
    this.setState({ openStatus: !openStatus });
  }

  render() {
    const { list = [], isEnd } = this.props;
    const { openStatus, } = this.state;
    const showDisplayOperate = list.length > 3;
    const cloneList = JSON.parse(JSON.stringify(list));
    if (showDisplayOperate && !openStatus) {
      cloneList.length = 3;
    }

    return (
      <div className="order-material-list">
        <div>
          <div className="flex table-cell tit">
            <span>序号</span>
            <span>素材</span>
            <span>状态</span>
          </div>
          {
            cloneList.map((i, idx) => {
              const { orderNo, status, texts = [], } = i;
              const { label, color } = STATUS_CONFIG[status];
              return (
                <div key={orderNo} className="flex table-cell content">
                  <span>{idx + 1}</span>
                  <span>{texts.join(';')}</span>
                  <span style={{color}}>{label}</span>
                </div>
              )
            })
          }
          {
            !list.length && <div className="no-data-tip">暂无数据</div>
          }
        </div>
        { showDisplayOperate 
          ? <div 
              onClick={this.displayMask} 
              className={`display-operate ${openStatus ? 'open-status' : 'folder-status'}`}
            >
              点击{openStatus ? '收起' : '展开'}
            </div>
          : <Deliver height=".43rem" /> }
      </div> 
    )
  }
}
