import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Row, Col, Button, Radio } from 'antd';
import ViewConfig from '../../components/ViewConfig';
import AdSearchBar from '../../components/Ad/AdSearchBar';
import OrderSearchBar from '../../components/Ad/OrderSearchBar';
import Deliver from '../../components/Deliver';
import AdTable from '../../components/Ad/AdTable';
import RateModal from '../../components/Ad/RateModal';
import RejectModal from '../../components/Ad/RejectModal';
import PreviewModal from '../../components/Ad/PreviewModal';
import * as types from '../../constants/types';
import { getUrlQuery} from "../../utils";
import { adOrderStatus } from '../../constants';

@connect(state => {
  return {
    adList: state.getIn(['ad', 'adList'])
  }
}, (dispatch) => ({
  handlePageChange (payload) {
    dispatch(push(payload));
  },
  getList (payload) {
    dispatch({
      type: types.AD_LIST_REQUEST,
      payload
    })
  },
  handleExport () {
    dispatch({type: types.AD_EXPORT_REQUEST, payload: {}});
  },
  handleBatchSettlement () {
    dispatch({type: types.AD_BATCH_SETTLE_REQUEST, payload: {
        nextAction: {type: types.AD_LIST_REQUEST, payload: null}
      }});
  },
  handleBatchReject (rows) {
    dispatch({
      type: types.AD_REJECT_MODAL_SHOW,
      payload: {
        rows
      }
    });
  },

}))
export default class Ad extends React.PureComponent {
  componentWillMount () {
    this.props.getList();
  }

  handleSearch = (values) => {
    const { pathname } = this.props.location;
    const payload = {
      pathname,
      query: {
        ...getUrlQuery(),
        ...values,
        page: 0,
      },
    };
    this.props.handlePageChange(payload);
  };

  onTypeChange = (agentAdvertiseStatus) => {
    const { pathname } = this.props.location;
    const payload = {
      pathname,
      query: {
        ...getUrlQuery(),
        page: 0,
        agentAdvertiseStatus
      },
    };
    if (!agentAdvertiseStatus) {
      payload.query.activityId = undefined;
    }
    this.props.handlePageChange(payload);
  };

  render () {
    const { handleExport, handleBatchReject, handleBatchSettlement } = this.props;
    const {
      agentAdvertiseStatus,
      ...otherQuerys
    } = getUrlQuery();

    return (
      <div>
        <ViewConfig title="广告订单" subTitle="" activeMenu="AD" activeSubMenu="AD" />
        <Button type="primary" onClick={handleExport}>导出订单</Button>
        <Deliver vertical={true} size={20} />
        {
          !agentAdvertiseStatus ?
            <AdSearchBar
              initialValues={otherQuerys}
              handleSearch={this.handleSearch}
            />
            :
            <OrderSearchBar
              initialValues={otherQuerys}
              handleSearch={this.handleSearch}
            />
        }
        <Deliver vertical={true} size={20} />
        <Row type="flex" justify="space-between">
          <Col>
            <Radio.Group value={agentAdvertiseStatus || ''} onChange={(e) => {this.onTypeChange(e.target.value)}}>
              <Radio.Button value=''>广告列表</Radio.Button>
              {
                adOrderStatus.map(s => {
                  return (
                    <Radio.Button key={s.key} value={s.key}>
                      {s.value}
                    </Radio.Button>
                  )
                })
              }
            </Radio.Group>
          </Col>
          {
            (agentAdvertiseStatus === 'PEND' || agentAdvertiseStatus === 'PASS') && (
              <Col>
                批量操作：
                {agentAdvertiseStatus === 'PEND' && <Button type="primary" onClick={handleBatchReject}>拒绝</Button>}
                {agentAdvertiseStatus === 'PASS' && <Button type="primary" onClick={handleBatchSettlement}>结算</Button>}
              </Col>
            )
          }
        </Row>
        <Deliver vertical={true} size={20} />
        <AdTable/>
        <RateModal />
        <RejectModal/>
        <PreviewModal />
      </div>
    )
  }
}
