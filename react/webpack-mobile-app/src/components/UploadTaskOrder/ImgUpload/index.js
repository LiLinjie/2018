import React from 'react';
import ImgUploadItem from './ImgUploadItem'
import './index.less'

export default class ImgUpload extends React.PureComponent {
  constructor(props) {
    super(props);
    this.imgRef = {}
  }

  // public method：获取图片地址
  getImgUrls() {
    const { imgTemplates } = this.props;
    let imgUrls = []
    imgTemplates.forEach((i, idx) => {
      const imgUrl = this.imgRef[idx].getUploadImgUrl();
      imgUrl && imgUrls.push(imgUrl);
    }) 
    return imgUrls;
  }

  render() {
    const { imgTemplates = [], onChange } = this.props;

    return (
      <div className="img-upload-wrap">
        { imgTemplates.map((imgUrl, idx) => {
            return <ImgUploadItem onChangeImg={onChange} key={idx} imgDemoUrl={imgUrl} ref={(ref) => { this.imgRef[idx] = ref;}} />
          })
        }
      </div>
    )
  }
}



