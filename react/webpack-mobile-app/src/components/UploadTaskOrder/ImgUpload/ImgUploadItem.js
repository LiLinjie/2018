import React from 'react';
import {getSetting} from '../../../../config';
import EXIF  from 'exif-js';
import './index.less';

export default class ImgUploadItem extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      imgUrl: '',
      isUploading: false
    }
  }

  removeImg = () => {
    const { onChangeImg } = this.props;
    this.setState({ imgUrl: '' }, () => {
      onChangeImg && onChangeImg();
    });
  }

  addImgs = () => {
    const { onChangeImg } = this.props;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        const { localIds } = res; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        this.setState({
          imgUrl: localIds[0]
        }, () => {
          onChangeImg && onChangeImg();
        })
      },
    });
  }

  // public method
  getUploadImgUrl() {
    return this.state.imgUrl
  }

  preview = (url) => {
    wx.previewImage({
      current: url,
      urls: [url]
    });
  }
  async onUpload (e) {
    this.setState({
      isUploading: true
    });
    if (typeof FileReader === 'undefined') {
      alertTip('您的浏览器不支持上传图片哟！');
      return;
    }
    let files = e.target.files || e.dataTransfer.files;
    if (files.length > 0){
      this.imgResize(files[0], (fileResize) => {
        this.uploadCallback(fileResize);
      });
    }
  }
  async uploadCallback (fileResize) {
    const { onChangeImg } = this.props;
    let fd = new FormData();
    fd.append('file', fileResize, 'image.jpg');

    if (fileResize && fileResize.size / 1024 / 1024 > 3) {
      alertTip('您上传的图片大于3M，请重新选择！');
      this.setState({
        isUploading: false
      });
      return;
    }

    try {
      const res = await fetch(`${getSetting('apiRoot')}/agent/image/save`, {
        method: 'POST',
        body: fd,
      });
      const data = await res.json();
      if (data.status === 1) {
        this.setState({ imgUrl: data.data.url, isUploading: false }, () => {
          onChangeImg && onChangeImg();
        });
      } else {
        alertTip(data.msg);
      }
    } catch (e) {
      alertTip(e);
    }
  }
  getPhotoOrientation (img) {
    let orient;
    try {
      EXIF.getData(img, function () {
        orient = EXIF.getTag(this, 'Orientation');
      });
      return orient;
    } catch (e) {
      alertTip(e);
    }
  }
  // 使用canvas压缩
  imgResize (file, callback) {
    let fileReader = new FileReader();
    let _this = this;
    fileReader.onload = function () {
      const IMG = new Image();
      IMG.src = this.result;
      IMG.onload = function () {
        let w = this.naturalWidth, h = this.naturalHeight, resizeW = 0, resizeH = 0;
        // maxSize 是压缩的设置，设置图片的最大宽度和最大高度，等比缩放，level是报错的质量，数值越小质量越低
        const maxSize = {
          width: 750,
          height: 750,
          level: 0.8
        };
        if(w > maxSize.width || h > maxSize.height){
          let multiple = Math.max(w / maxSize.width, h / maxSize.height);
          resizeW = w / multiple;
          resizeH = h / multiple;
        } else {
          // 如果图片尺寸小于最大限制，则不压缩直接上传
          return callback(file);
        }
        let canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d');
        let orient = _this.getPhotoOrientation(IMG);
        if (orient === 6){
          canvas.width = resizeH;
          canvas.height = resizeW;
          ctx.rotate(90 * Math.PI / 180);
          ctx.drawImage(IMG, 0, -resizeH, resizeW, resizeH);
        } else {
          canvas.width = resizeW;
          canvas.height = resizeH;
          ctx.drawImage(IMG, 0, 0, resizeW, resizeH);
        }
        const base64 = canvas.toDataURL('image/jpeg', maxSize.level);
        _this.convertBlob(window.atob(base64.split(',')[1]), callback);
      }
    };
    fileReader.readAsDataURL(file);
  }

  convertBlob (base64, callback) {
    const buffer = new ArrayBuffer(base64.length);
    const ubuffer = new Uint8Array(buffer);
    for (let i = 0; i < base64.length; i++) {
      ubuffer[i] = base64.charCodeAt(i)
    }
    let blob;
    try {
      blob = new Blob([buffer], {type: 'image/jpg'});
    } catch (e) {
      window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
      if (e.name === 'TypeError' && window.BlobBuilder){
        let blobBuilder = new BlobBuilder();
        blobBuilder.append(buffer);
        blob = blobBuilder.getBlob('image/jpg');
      } else if(e.name === "InvalidStateError"){
        // InvalidStateError (tested on FF13 WinXP)
        alertTip('InvalidStateError');
        blob = new Blob( [buffer], {type : "image/jpeg"});
      } else{
        alertTip('Sorry，您的浏览器不支持上传图片哟！');
        // We're screwed, blob constructor unsupported entirely
      }
    }
    callback(blob);
  }

  render() {
    const { imgDemoUrl } = this.props;
    const { imgUrl, isUploading } = this.state;
    const showUploadBtn = !imgUrl;

    return (
      <div className="flex justify-between upload-content">
        <div className="img-wrap">
          <img onClick={() => this.preview(imgDemoUrl)} src={imgDemoUrl} alt="示例图片"/>
        </div>
        { showUploadBtn
          ? <div className="img-wrap upload-wrap">
              {/*<div className="upload-btn">
                <input type="file" accept="image/*" onChange={this.onUpload.bind(this)} className="upload-btn"/>
                <span>{isUploading ? '上传中' : '上传截图'}</span>
              </div>*/}
              <button onClick={this.addImgs}>上传截图</button>
            </div>
          : <div className="img-wrap">
              <img onClick={() => this.preview(imgUrl)} src={imgUrl} alt="上传的图片"/>
              <div className="remove" onClick={this.removeImg}></div>
            </div>
        }
      </div>
    )
  }
}



