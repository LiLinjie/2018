import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Broadcast from '../../components/Tasks/Broadcast';
import ViewConfig from '../../components/ViewConfig';
import DataNone from '../../components/DataNone'
import { REJECT_STATUS, STATUS_CONFIG, } from '../../constants/tasks'
import * as types from '../../constants/actionTypes';
import './index.less'
import {getQuery} from "../../utils";

@connect(
  state => ({
    list: state.getIn(['tasks', 'materialList'])
  }),
  dispatch => ({
    getMaterialList(payload) {
      dispatch({
        type: types.TASKS_CHECK_LIST_REQUEST,
        payload
      })
    }
  })
)
export default class CheckDetail extends PureComponent {
  componentDidMount() {
    const { location } = this.props;
    const { id } = getQuery(location);
    this.props.getMaterialList({ activityId: id });
  }

  render() {
    let { list = [] } = this.props;
    list = list.toJS();
    const noList = !list.length;

    return (
      <div className="task-check-detail">
        <ViewConfig documentTitle="审核明细"/>
        <Broadcast />
        {
          list.map(i => {
            const { status, remark, texts, createdAt,  } = i;
            let { imgUrls } = i;
            imgUrls = imgUrls || [];
            const statusConfig = STATUS_CONFIG[status];
            const { color, label } = statusConfig;
            const isReject = status === REJECT_STATUS; // 是否是拒绝状态
            return (
              <div key={createdAt} className="check-card">
                <div className="flex justify-between status-wrap">
                  <span className="desc">上传时间: { new Date(createdAt).format('yyyy-MM-dd hh:mm:ss')}</span>
                  <span style={{color}}>{label}</span>
                </div>
                { isReject && (<p className="reject-text">原因： {remark}</p>)}
                <div className="imgs">
                  {
                    imgUrls.map((i, idx) => (<div key={idx} className="img"><img src={i} alt="图片"/></div>))
                  }
                </div>
                { texts && (<p className="remark">素材: {texts.join(';')}</p>)}
              </div>
            )
          })
        }
        { noList && <DataNone marginTop="1rem" dataNoneTxt="暂无数据" /> }
      </div>
    )
  }
}
