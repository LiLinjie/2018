import React from 'react';
import { connect } from 'react-redux';
import { Modal, Radio, Form, Input } from 'antd';
import * as types from '../../constants/types';
const FormItem = Form.Item;
const remarkGroup = [
  '截图重复上传',
  '截图与所需上传内容不符',
  '上传示例图片，警告一次',
  '上传他人图片，警告一次'
];

@connect(state => {
  return {
    rejectInfo: state.getIn(['ad', 'rejectInfo'])
  }
}, (dispatch) => ({
  handleCancel () {
    dispatch({
      type: types.AD_REJECT_MODAL_HIDE
    });
  },
  handleInputChange (val) {
    dispatch({
      type: types.AD_REJECT_REMARK_CHANGE,
      payload: val
    })
  },
  handleBatchSubmit () {
    dispatch({type: types.AD_BATCH_REJECT_REQUEST, payload: {
        nextAction: {type: types.AD_LIST_REQUEST, payload: null}
      }});
  }
}))
export default Form.create()(class RejectModal extends React.PureComponent {
  componentWillMount() {

  }

  onChange(e) {
    this.props.handleInputChange(e.target.value);
    this.props.form.setFieldsValue({
      remark: e.target.value
    });
  }
  handleOk = () => {
    const {form, handleBatchSubmit} = this.props;
    form.validateFields((err) => {
      if (!err) {
        handleBatchSubmit();
      }
    });
  };

  render () {
    const { rejectInfo, handleCancel, form } = this.props;
    const { show, remark } = rejectInfo.toJS();
    const { getFieldDecorator } = form;
    const labelCol = {span: 6};
    const wrapperCol = { span: 14 };
    return (
      show ?
        <Modal
          title='拒绝原因'
          width={600}
          visible={show}
          onCancel={handleCancel}
          onOk={this.handleOk}
        >
          <FormItem label="拒绝原因模板" extra="点击上面选项，快速填写拒绝原因" labelCol={labelCol} wrapperCol={wrapperCol}>
            {getFieldDecorator('remark', {
              initialValue: remark
            })(
              <Radio.Group onChange={e => this.onChange(e)}>
                {
                  remarkGroup.map((i, idx) => {
                    return <Radio style={{display: 'block'}} key={idx} value={i} >{i}</Radio>
                  })
                }
              </Radio.Group>
            )}
          </FormItem>
          <Form layout={'horizontal'}>
            <FormItem label="原因" labelCol={labelCol} wrapperCol={wrapperCol}>
              {getFieldDecorator('remark', {
                rules: [{required: true, whitespace: true, message: '请填写原因'}],
                initialValue: remark,
              })(
                <Input placeholder="请输入拒绝原因，内容不能为空，最多30字" type="textarea" maxLength={30} onChange={e => this.onChange(e)} />
              )}
            </FormItem>
          </Form>
        </Modal>
        :
        null
    )
  }
})
