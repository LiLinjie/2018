'use extensible';
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Table, message, Popover, Icon, Button, Tooltip } from 'antd';
import { Link } from 'react-router';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import QRCode from 'qrcode.react';
import {getPrice, getUrlQuery, showTotal} from '../../utils';
import * as types from '../../constants/types';

const columns = ({agentAdvertiseStatus, handleSetRate, handlePreview, handleReject, handleSettle}) => {
  let cols = [];
  if (!agentAdvertiseStatus) {
    cols = [{
      title: '序号',
      dataIndex: 'id',
      render: (t, r) => <Link to={`/ad?agentAdvertiseStatus=PEND&page=0&activityId=${t}`}>{t}</Link>
    }, {
      title: '任务链接地址',
      render: (t, r) => {
        let text = `/taskDetail`;
        return <div>
          <CopyToClipboard
            onCopy={() => {message.success('复制成功');}}
            text={text}>
            <Link>复制<Icon type="copy" /></Link>
          </CopyToClipboard>
          |
          <Popover
            placement="bottom"
            title="手机扫描二维码进行预览"
            content={<QRCode value={text} />}
            trigger="click">
            预览<Icon type="eye" />
          </Popover>
        </div>
      }
    }, {
      title: '广告名称',
      dataIndex: 'name',
      render: (t, r) => <div style={{maxWidth: '100px'}}>{t}</div>
    }, {
      title: '收入',
      dataIndex: 'income',
      render: (t, r) => <span>￥{getPrice(t)}</span>
    }, {
      title: '渠道支出',
      dataIndex: 'outcome',
      render: (t, r) => <span>￥{getPrice(t)}</span>
    }, {
      title: '用户支出',
      dataIndex: 'userOutcom',
      render: (t, r) => <span>￥{getPrice(t)}</span>
    },  {
      title: '创建时间',
      dataIndex: 'createAt',
      render: (t, r) => <span>{ new Date(t).format('yyyy-MM-dd')} <br/> { new Date(t).format('hh:mm:ss')}</span>
    }, {
      title: '总份数',
      dataIndex: 'num',
    }, {
      title: '参与数',
      dataIndex: 'orderNum',
    }, {
      title: '通过数',
      dataIndex: 'passNum',
    }, {
      title: '未审核数',
      dataIndex: 'pendNum',
    }, {
      title: '状态',
      dataIndex: 'statusDesc',
      render: (s, r) => <span>{s}</span>
    }, {
      title: '操作',
      render: (t, r) => {
        const { status } = r;
        return (
          <Button size="small" type="primary" disabled={status !== 'START'} onClick={() => handleSetRate(r)}>佣金设置</Button>
        )
      }
    }];
  } else {
    cols = [{
      title: '订单编号',
      dataIndex: 'id'
    }, {
      title: '广告名称',
      dataIndex: 'name',
      render: (t, r) => <div style={{maxWidth: '100px'}}>{t}</div>
    }, {
      title: '完成者',
      dataIndex: 'user'
    }, {
      title: '负责人',
      dataIndex: 'employee'
    }, {
      title: '素材',
      render: (t, r) => {
        const { text, imgUrls, texts } = r;
        return (
          <div style={{width: '160px', margin: '0 auto'}}>
            {
              imgUrls && imgUrls.map((i, idx) => {
                return <img src={i} alt="" key={idx} style={{width: '70px', margin: '0 10px 10px 0'}} onClick={() => handlePreview(imgUrls)}/>
              })
            }
            {
              texts ?
                texts.map((i, idx) => <p key={idx}>备注{idx + 1}. {i || '无'}</p>)
                :
                <p>{ !!text && text !== 'null' && text }</p>
            }
          </div>
        )
      }
    }, {
      title: '结算金额',
      dataIndex: 'amount',
      render: (t, r) => <span>￥{getPrice(t)}</span>
    }, {
      title: '录入时间',
      dataIndex: 'createdAt',
      render: (t, r) => <span>{ new Date(t).format('yyyy-MM-dd hh:mm:ss')}</span>
    }];
    if (agentAdvertiseStatus === 'PEND') {
      cols.push({
        title: '操作',
        render: (t, r) => <Button size="small" type="primary" onClick={() => handleReject(r)}>拒绝</Button>
      });
    } else if (agentAdvertiseStatus === 'PASS') {
      cols.push({
        title: '状态',
        dataIndex: 'status'
      }, {
        title: '操作',
        render: (t, r) => <Button size="small" type="primary" onClick={() => handleSettle(r)}>结算</Button>
      });
    } else if (agentAdvertiseStatus === 'REJECT') {
      cols.push({
        title: '拒绝原因',
        dataIndex: 'remark',
        render: (t, r) => (
          <Tooltip title={t}>
            <Link>拒绝原因</Link>
          </Tooltip>
        )
      });
    }
  }
  return cols;
};

@connect(state => {
  return {
    adList: state.getIn(['ad', 'adList']),
    selectedRowKeys: state.getIn(['ad', 'selectedRowKeys'])
  }
}, (dispatch) => ({
  handlePageChange (payload) {
    dispatch(push(payload));
  },
  handleSelect (payload) {
    dispatch({
      type: types.AD_SELECT_KEY_REQUEST,
      payload
    });
  },
  handleSetRate (row) {
    dispatch({
      type: types.AD_RATE_MODAL_SHOW,
      payload: row
    });
  },
  handlePreview (imgs) {
    dispatch({
      type: types.AD_ACTIVITY_IMG_SHOW,
      payload: imgs
    });
  },
  handleReject (row) {
    dispatch({
      type: types.AD_REJECT_MODAL_SHOW,
      payload: {
        rows: [row]
      }
    });
  },
  handleSettle (row) {
    dispatch({
      type: types.AD_BATCH_SETTLE_REQUEST,
      payload: {
        rows: [row],
        nextAction: {type: types.AD_LIST_REQUEST, payload: null}
      }
    })
  }
}))
export default class ListTable extends React.PureComponent {
  onPageChange = ({current, pageSize, ...otherProps}, filters, sorter) => {
    const { pathname } = window.location;
    const sortVal = sorter.field === 'mobile' ? sorter.order === 'ascend' ? 'MOBILE_ASC' : 'MOBILE_DESC' : void 0;
    const { sort } = getUrlQuery();
    const payload = {
      pathname,
      query: {
        ...getUrlQuery(),
        page: sort !== sortVal ? 0 : current - 1,
        size: pageSize,
        sort: sortVal
      },
    };
    this.props.handlePageChange(payload);
  };

  render () {
    const { adList: { data, loading, page, size, totalItem }, selectedRowKeys = [], handleSelect, ...otherProps } = this.props;
    let {
      agentAdvertiseStatus,
    } = getUrlQuery();
    const pagination = {
      total: totalItem,
      current: (1 + page * 1) || 1,
      pageSize: +size || 10,
      showQuickJumper: true,
      showTotal: showTotal,
      showSizeChanger: true,
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: (record, rows) => {
        handleSelect({keys: record, rows});
      },
      getCheckboxProps: (record) => ({
        disabled: record.status === 'PAUSE_AUTO',
      })
    };
    return (
      <Table
        loading={loading}
        rowKey={r => r.id}
        indentSize={30}
        rowSelection={agentAdvertiseStatus === 'PEND' || agentAdvertiseStatus === 'PASS' ? rowSelection : void 0}
        columns={columns({agentAdvertiseStatus, ...otherProps})}
        dataSource={data.toJS()}
        pagination={pagination}
        onChange={this.onPageChange}
      />
    );
  }
}
