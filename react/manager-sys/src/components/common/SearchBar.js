import React from 'react';
import { Form, Row, Col, Input, Button, Checkbox, Select, DatePicker, InputNumber, Card } from 'antd';
import moment from 'moment';
import { valuesToFormFields } from '../../utils';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

export default function (key) {
  const hasKey = !!key;

  @Form.create(hasKey ? {
    onValuesChange (props, values) {
      props.handleUpdate(values);
    },
    mapPropsToFields (props) {
      return valuesToFormFields(props.values);
    }
  } : {})
  class SearchForm extends React.PureComponent {
    state = {
      expand: false,
      hideAdvance: true,
      disabledKeys: []
    }

    componentWillMount () {
      let disabledKeys = [];
      (this.props.searchKeys || []).map((child, index) => {
        if (child.options && child.options.disabled) {
          disabledKeys.push(child.key);
          return child;
        }
      });
      this.setState({disabledKeys});
    }

    handleSearch = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          let results = {};
          this.getKeys().forEach(key => {
            switch (this.findProp(key).type) {
              case 'dateTime':
                results[key] = values[key] ? values[key].format() : null;
                break;
              case 'dateRange': {
                const { startKey, endKey, startOf } = this.findProp(key).options;
                const startTime = values[key] && values[key][0]
                  ? (startOf ? values[key][0].startOf(startOf).format() : values[key][0].format())
                  : null;
                const endTime = values[key] && values[key][1]
                  ? (startOf ? values[key][1].startOf(startOf).format() : values[key][1].format())
                  : null;
                results[startKey] = startTime;
                results[endKey] = endTime;
                break;
              }
              case 'number':
                results[key] = values[key] === undefined ? null : values[key] * 1;
                break;
              case 'inputGroup': {
                results[`${key}Min`] = values[`${key}Min`] ? values[`${key}Min`] : null;
                results[`${key}Max`] = values[`${key}Max`] ? values[`${key}Max`] : null;
                break;
              }
              default:
                results[key] = values[key];
            }
          });
          delete results.undefined;
          this.props.handleSearch && this.props.handleSearch(results);
        }
      });
    };

    getKeys = () => {
      return (this.props.searchKeys || []).map(prop => prop.key);
    };

    findProp = (key) => {
      return (this.props.searchKeys || []).find(data => key === data.key);
    };

    handleReset = () => {
      if (!hasKey) {
        window.location.href = window.location.pathname;
        return;
      }
      const { disabledKeys } = this.state;
      const keys = Object.keys(this.props.form.getFieldsValue());
      let newForm = {};
      keys.forEach(key => {
        if (disabledKeys.indexOf(key) === -1) {
          newForm[key] = {
            value: void 0
          }
        }
      });

      this.props.form.setFields(newForm);
      const values = this.props.form.getFieldsValue();
      const searchKeys = this.props.searchKeys;
      searchKeys.forEach(key => {
        if (key.type === 'dateRange') {
          let startKey = key.options.startKey;
          let endKey = key.options.endKey;
          values[startKey] = void 0;
          values[endKey] = void 0;
        }
      });
      this.props.handleReset && this.props.handleReset(values);
    }

    filterSelect = (value, option) => {
      const optionValue = option.props.children;
      let textMatch = optionValue.indexOf(value) > -1;
      return textMatch;
    }

    switchHideAdvance = () => {
      const { hideAdvance } = this.state;
      this.setState({ hideAdvance: !hideAdvance });
    }

    render () {
      let hideFrom = -1;
      const { getFieldDecorator } = this.props.form;

      if (this.props.hasOwnProperty('hideFrom')) {
        hideFrom = this.props.hideFrom;
      }

      const hideAble = hideFrom >= 1;

      const getControl = (data) => {
        switch (data.type) {
          case 'custom': {
            return data.component;
          }
          case 'checkbox': {
            return (
              <Checkbox {...data.props}/>
            )
          }
          case 'select': {
            return (
              <Select
                style={{width: '100%'}}
                filterOption={this.filterSelect}
                {...data.props}
                placeholder={data.placeholder}
              >
                {data.selects.map(option => {
                  return <Select.Option key={option.key}>{option.value}</Select.Option>
                })}
              </Select>
            );
          }
          case 'number':
            return <InputNumber style={{width: '100%'}} {...data.props}/>;
          case 'dateTime':
            return <DatePicker style={{width: '100%'}} {...data.props} />;
          case 'dateRange':
            return <RangePicker style={{width: '100%'}} {...data.props} />;
          default:
            return <Input {...data.props} />
        }
      };

      let children = (this.props.searchKeys || []).map((child, index) => {
        const isDateRange = child.type === 'dateRange';
        const styles = child.styles || {
          colSpan: isDateRange ? 16 : 8,
          labelSpan: isDateRange ? 4 : 8,
          controlSpan: isDateRange ? 20 : 16
        };

        const { colSpan, labelSpan, controlSpan } = styles;

        let item;

        let formItemLayout = {
          labelCol: { span: labelSpan },
          wrapperCol: { span: controlSpan },
        };

        if (!child.key) {
          item = <Col span={colSpan} key={index}>
            <FormItem {...formItemLayout} label=" " style={{opacity: 0}}/>
          </Col>
        } else {
          if (child.type === 'dateRange' && child.options) {
            let start = void 0;
            let end = void 0;
            if (child.options.start) {
              start = moment(new Date(child.options.start));
            }
            if (child.options.end) {
              end = moment(new Date(child.options.end));
            }
            child.options = {
              ...child.options,
              initialValue: [start, end]
            }
          }

          if (child.type === 'inputGroup') {
            const formItemLayout1 = {
              labelCol: { span: 8 },
              wrapperCol: { span: 7 },
            };
            const formItemLayout2 = {
              labelCol: { span: 0 },
              wrapperCol: { span: 24 },
            };
            item = <Col span={colSpan} key={index} className="ant-form-item-group">
              <FormItem {...formItemLayout1} label={`${child.label}`}>
                {getFieldDecorator(`${child.min.key}`, {
                    ...child.min.options,
                  }
                )(
                  getControl(child.min)
                )}
              </FormItem>
              <FormItem {...formItemLayout2} label={`-`} colon={false}>
                {getFieldDecorator(`${child.max.key}`, {
                    ...child.max.options,
                  }
                )(
                  getControl(child.max)
                )}
              </FormItem>
            </Col>
          } else {
            item = <Col span={colSpan} key={index}>
              <FormItem {...formItemLayout} label={`${child.label}`}>
                {getFieldDecorator(`${child.key}`, {
                    ...child.options,
                  }
                )(
                  getControl(child)
                )}
              </FormItem>
            </Col>
          }
        }
        return item;
      });

      const { hideAdvance } = this.state;
      if (hideAble && hideAdvance) {
        children = children.slice(0, hideFrom - 1);
      }

      return (
        <Card>
          <Form
            className="ant-advanced-search-form"
            onSubmit={this.handleSearch}
          >
            <Row gutter={40}>
              {children}
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                {hideAble && <a onClick={this.switchHideAdvance} style={{marginRight: 20}}>{hideAdvance ? '展开高级搜索' : '隐藏高级搜索'}</a>}
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                  重置
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      );
    }
  }

  // if (hasKey) {
  //   SearchForm = connect(
  //     (state) => ({values: state.getIn(['searchForm', key], Map())}),
  //     (dispatch) => ({
  //       handleUpdate (values) {
  //         dispatch({
  //           type: types.SEARCH_FORM_UPDATE_FIELD,
  //           payload: {
  //             key,
  //             values
  //           }
  //         });
  //       }
  //     })
  //   )(SearchForm);
  // }

  return SearchForm;
}
