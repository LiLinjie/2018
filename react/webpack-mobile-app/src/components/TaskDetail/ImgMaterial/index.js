import React from 'react';
import './index.less'
import { STATUS_CONFIG } from '../../../constants/tasks'
import Deliver from '../../../components/Deliver'

export default class ImgMaterial extends React.Component {
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
    const { isEnd, list } = this.props;
    const { openStatus } = this.state;
    const showDisplayOperate = list.length > 5;
    const cloneList = JSON.parse(JSON.stringify(list));
    if (showDisplayOperate && !openStatus && list.length > 9) {
      cloneList.length = isEnd ? 10 : 9;
    }

    return (
      <div className="img-material-wrap imgs">
        {
          cloneList.map((i, index) => {
            const { imgUrl, status, } = i;
            const { label } = STATUS_CONFIG[status];
            return (
              <div className="img" key={index}>
                <img src={imgUrl} alt="素材"/>
                <div className="status">{label}</div>
              </div>
            )
          })
        }
       { showDisplayOperate 
        ? <div 
            onClick={this.displayMask} 
            className={`display-operate ${openStatus ? 'open-status' : 'folder-status'}`}
          >
            点击{openStatus ? '收起' : '展开'}
          </div> 
          : <Deliver vertical={true} height=".4rem" /> }
      </div> 
    )
  }
}

