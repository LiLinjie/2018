import React from 'react'
import './index.less'
import RemarkItem from './RemarkItem'

export default class Remarks extends React.PureComponent {
  constructor(props) {
    super(props);
    this.remarkRef = {}
  }
  
  // public method
  getRemarks() {
    const { placeholders } = this.props;
    let remarks = [];
    placeholders.forEach((i, idx) => {
      let text = this.remarkRef[idx].getRemark();
      text = text.trim();
      text && remarks.push(text)
    }) 

    return remarks;
  }

  render() {
    const { placeholders = [], onChange } = this.props;

    return (
      <div className="remarks-wrap">
        { placeholders.map((i, idx) => {
          return <RemarkItem onChangeRemark={onChange} key={idx} idx={idx} placeholder={i} ref={(ref) => { this.remarkRef[idx] = ref;}} />
        })}
      </div>
    )
  }
}