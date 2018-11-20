import React from 'react';
import { connect } from 'react-redux';
import { Modal, Carousel, Icon, Row, Col } from 'antd';
import * as types from '../../constants/types';

@connect(state => {
  return {
    imgPreview: state.getIn(['ad', 'imgPreview'])
  }
}, (dispatch) => ({
  handleCancel () {
    dispatch({
      type: types.AD_ACTIVITY_IMG_HIDE
    });
  }
}))
export default class PreviewModal extends React.PureComponent {
  componentWillMount() {
    this.slideRef = null;
  }

  turnLeft = () => {
    this.slideRef.innerSlider.slickPrev();
  };

  turnRight = () => {
    this.slideRef.innerSlider.slickNext();
  };

  render () {
    const { imgPreview, handleCancel } = this.props;
    const { show, img } = imgPreview.toJS();
    return (
      <Modal
        width={300}
        visible={show}
        footer={null}
        closable={false}
        onCancel={handleCancel}
      >
        <Carousel ref={(ref) => (this.slideRef = ref)}>
          { img.map((i, idx) => (<div key={idx}><img key={idx} style={{maxHeight: '100%'}} src={i} alt="" width="268"/></div>)) }
        </Carousel>
        { (img.length > 1) && (<Row type="flex" justify="space-between">
          <Col>
            <div style={{textAlign: 'center', cursor: 'pointer'}} onClick={this.turnLeft}><Icon type="left" />上一张</div>
          </Col>
          <Col>
            <div style={{textAlign: 'center', cursor: 'pointer'}} onClick={this.turnRight}>下一张<Icon type="right" /></div>
          </Col>
        </Row>) }
      </Modal>
    )
  }
}
