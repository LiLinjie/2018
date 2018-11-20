'use extensible';
import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Icon, Button } from "antd";
import './index.less';
import * as types from '../../constants/types';

const FormItem = Form.Item;

@connect(state => {
  return {
    dataTemp: state.getIn(['user', 'dataTemp'])
  }
}, (dispatch) => ({
  login (payload) {
    dispatch({
      type: types.USER_LOGIN_REQUEST,
      payload
    })
  }
}))
@Form.create({})
class Login extends React.PureComponent {
  handleOk = () => {
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.login(values);
    });
  }

  render () {
    const { dataTemp: {loading} } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-wrap">
        <div className="login-box">
          <div className="logo"><h1>登录中心</h1></div>
          <Form layout={'horizontal'}>
            <FormItem>
              {getFieldDecorator('loginname', {
                initialValue: '',
                rules: [
                  { required: true, message: '请填写用户名！'}
                ]
              })(
                <Input
                  size="large"
                  prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                  onPressEnter={this.handleOk}
                  placeholder="用户名"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('pass', {
                initialValue: '',
                rules: [
                  { required: true, message: '请填写密码！'}
                ]
              })(
                <Input
                  size="large"
                  type="password"
                  prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                  onPressEnter={this.handleOk}
                  placeholder="密码"
                />
              )}
            </FormItem>
          </Form>
          <div>
            <Button type="primary" block size="large" onClick={this.handleOk} loading={loading}>
              登录
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
