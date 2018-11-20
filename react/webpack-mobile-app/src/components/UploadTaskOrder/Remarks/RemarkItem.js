import React from 'react'

export default class RemarkItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      remark: ''
    }
  }

  getRemark() {
    return this.state.remark;
  }

  render() {
    const { remark } = this.state;
    const { placeholder, idx, onChangeRemark } = this.props;

    return (
      <div className="remark-item flex items-center">
        <span>备注&nbsp;{idx + 1}</span>
        <input
          type="text"
          value={remark}
          className="flex-1"
          placeholder={placeholder}
          onChange={(e) => { 
            this.setState({ remark: e.target.value },
              () => { onChangeRemark && onChangeRemark() 
            })
          }}
        />
      </div>
    )
  }
}