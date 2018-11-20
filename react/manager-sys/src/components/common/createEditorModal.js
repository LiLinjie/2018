'use extensible';
import React from 'react';
import { connect } from 'react-redux';
import { Form, Modal, Button } from 'antd';
import * as types from '../../constants/types';
import { Map, list } from 'immutable';
import { valuesToFormFields } from '../../utils';

const FormItem = Form.Item;

export default function ({
  editorKey,
  fields,
  extraDataMaps = [],
  createFields = (extraData) => [],
  labelCol = {span: 4},
  wrapperCol = {span: 20},
  wrapperClassName = '',
  width
 }) {
  @connect(state => {
    return {
      editor: state.getIn(['editor', editorKey], Map()),
      extraData: extraDataMaps.reduce((p, c) => {
        p[c.key] = state.getIn(c.path, c.defaultValue);
        return p;
      }, {})
    };
  }, (dispatch) => ({
    handleReset () {
      dispatch({
        type: types.EDITOR_RESET_VALUES,
        payload: {
          key: editorKey
        }
      });
    },
    handleUpdateValues (values) {
      dispatch({
        type: types.EDITOR_UPDATE_VALUES,
        payload: {
          key: editorKey,
          values
        }
      });
    },
    handleSubmit () {
      dispatch({
        type: types.EDITOR_SUBMIT_EDIT,
        payload: {
          key: editorKey
        }
      });
    },
    handleCancel () {
      dispatch({
        type: types.EDITOR_END_EDIT,
        payload: {
          key: editorKey
        }
      });
    }
  }))
  @Form.create({
    onValuesChange (props, values) {
      // TODO: reset的时候会循环触发onValuesChange事件
      props.handleUpdateValues(values);
    },
    mapPropsToFields (props) {
      const initialValues = props.editor.get('initialValues', Map());
      const newValues = props.editor.get('newValues', Map());
      return valuesToFormFields(initialValues.merge(newValues));
    }
  })
  class EditorModal extends React.PureComponent {
    handleTrySubmit = () => {
      const { form, handleSubmit } = this.props;
      form.validateFields((err) => {
        if (!err) {
          handleSubmit();
        }
      });
    };

    render () {
      const { form, editor, handleReset, handleCancel, extraData } = this.props;
      const { getFieldDecorator } = form;
      const submitting = editor.get('submitting');
      const renderFields = fields ? fields : createFields(extraData);

      return (
        <Modal
          title={editor.get('editorName')}
          visible={editor.get('editing')}
          wrapClassName={wrapperClassName}
          width={width}
          footer={(
            <div>
              <Button loading={submitting} type="primary" onClick={this.handleTrySubmit}>确定</Button>
              <Button type="ghost" onClick={handleReset}>重置</Button>
              <Button type="ghost" onClick={handleCancel}>取消</Button>
            </div>
          )}
          maskClosable={false}
          onCancel={handleCancel}
        >
          {
            editor.get('editing') ?
              <Form layout="horizontal">
                {renderFields.map(i => {
                    let {valuePropName, label, key, initialValue, rules, component, ...other} = i;
                    if (valuePropName !== void 0) {
                      valuePropName = {valuePropName: i.valuePropName};
                    }
                    return <FormItem label={label} key={key} labelCol={labelCol} wrapperCol={wrapperCol} {...other}>
                      {getFieldDecorator(key, {initialValue, rules, ...valuePropName})(component)}
                    </FormItem>
                  }
                )}
              </Form> : ''
          }
        </Modal>
      );
    }
  }

  return EditorModal;
}
