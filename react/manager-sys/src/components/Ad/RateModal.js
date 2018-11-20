import React from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, Row, Col } from 'antd';
import * as types from '../../constants/types';
const FormItem = Form.Item;

@connect(state => {
  return {
    rateInfo: state.getIn(['ad', 'rateInfo'])
  }
}, (dispatch) => ({
  handleCancel () {
    dispatch({
      type: types.AD_RATE_MODAL_HIDE
    });
  },
  handleSubmit () {
    dispatch({
      type: types.AD_RATE_SETTING_REQUEST,
      payload: {
        nextAction: {type: types.AD_LIST_REQUEST, payload: null}
      }
    });
  },
  handleUpdateValues (val) {
    dispatch({
      type: types.AD_RATE_SETTING_CHANGE,
      payload: val
    })
  }
}))
@Form.create({
  onValuesChange (props, values) {
    props.handleUpdateValues(values);
  }
})
class RateModal extends React.PureComponent {
  componentWillMount() {

  }

  handleOk = () => {
    const {form, handleSubmit} = this.props;
    form.validateFields((err) => {
      if (!err) {
        handleSubmit();
      }
    });
  }

  render () {
    const { rateInfo, handleCancel, form } = this.props;
    const { show, rate, oneRate, userRate } = rateInfo.toJS();
    const { getFieldDecorator } = form;
    const labelCol = {span: 6};
    const wrapperCol = { span: 14 };
    return (
      show ?
        <Modal
          title='佣金设置'
          width={600}
          visible={show}
          onCancel={handleCancel}
          onOk={this.handleOk}
        >
          <Row>
            <Col span={6}></Col>
            <Col span={18}>
              <p style={{color: 'red'}}>注：请设置金额，一旦提交，不可更改</p>
            </Col>
          </Row>
          <Form layout={'horizontal'}>
            <FormItem label="佣金" labelCol={labelCol} wrapperCol={wrapperCol} extra="每个订单可设置的最高佣金">
              {getFieldDecorator('rate', {
                rules: [{required: true, message: '请设置佣金'}],
                initialValue: rate ? (rate / 100).toFixed(2) : ''
              })(
                <Input type="number" addonAfter="元/笔" />
              )}
            </FormItem>
            <FormItem label="下级佣金" labelCol={labelCol} wrapperCol={wrapperCol} extra="下级每个订单可得佣金">
              {getFieldDecorator('oneRate', {
                rules: [
                  { required: true, message: '请设置下级佣金' },
                  { pattern: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/, message: '请输入数字' }
                ],
                initialValue: oneRate ? (oneRate / 100).toFixed(2) : ''
              })(
                <Input type="number" addonAfter="元/笔" />
              )}
            </FormItem>
            <FormItem label="用户佣金" labelCol={labelCol} wrapperCol={wrapperCol} extra="直接给用户每个订单可得">
              {getFieldDecorator('userRate', {
                rules: [{required: true, message: '请设置用户佣金'}],
                initialValue: userRate ? (userRate / 100).toFixed(2) : ''
              })(
                <Input type="number" addonAfter="元/笔" />
              )}
            </FormItem>
          </Form>

        </Modal>
        :
        null
    )
  }
}

export default RateModal
