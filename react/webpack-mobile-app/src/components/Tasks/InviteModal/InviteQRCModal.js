import React, { PureComponent } from 'react';
import QRCode from 'qrcode.react'
import './index.less';
import html2canvas from 'html2canvas'
import Deliver from '../../../components/Deliver'

export default class InviteQRCModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shareImgUrl: '', // 分享图
      avatarUrl: '', // 头像地址
      qrcodeUrl: '', // 二维码地址
    }
  }

  componentDidMount() {
    // 头像变化，转换成base64
    // this.props.avatar && this.convertImgToBase64(this.props.avatar, (url) => {
    //   this.setState({
    //     avatarUrl: url
    //   })
    // });

    this.props.link && this.parseQRToBase64(); // 转换二维码
  }

  componentWillReceiveProps(nextPorps) {
    // 头像变化，转换成base64
    // if (this.props.avatar !== nextPorps.avatar && nextPorps.avatar) {
    //   this.convertImgToBase64(nextPorps.avatar, (url) => {
    //     this.setState({
    //       avatarUrl: url
    //     })
    //   })
    // }

    // 二维码canvas转换成base64地址
    if (this.props.link !== nextPorps.link && nextPorps.link) {
      this.parseQRToBase64();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.show && !prevProps.show && !this.state.shareImgUrl) { // 弹框出现,生成分享图
      const opts = {
        useCORS: true,
        backgroundColor: null,
      };

      html2canvas(document.querySelector('.J-invite-qrcode-content'), opts).then(canvas => {
        this.convertCanvasToImage(canvas);
      });
    }
  }

  // 生成分享图
  convertCanvasToImage (canvas) {
    const dataUrl = canvas.toDataURL('image/png'); //base64图片数据
    this.setState({ shareImgUrl: dataUrl })
  }

  // 二维码canvas转成base64地址
  parseQRToBase64() {
    const canvas = document.querySelector('.J-contaner canvas');
    const dataUrl = canvas.toDataURL('image/png'); //base64图片数据
    this.setState({
      qrcodeUrl: dataUrl
    })
  }

  // 截图转换成canvas
  convertImgToBase64(url, callback){
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img,0,0);
      const dataURL = canvas.toDataURL('image/png');
      callback(dataURL);
      canvas = null;
    };
　　  img.src = url;
  }

  render() {
    const { link, show, hideModal, name, avatar, } = this.props;
    const { shareImgUrl, qrcodeUrl } = this.state;
    const avatarUrl = avatar ? `${avatar}?t=${Date.now()}` : null;

    return (
      <div className="invite-qr-modal">
        <div className="qrcode-content J-contaner">
          <QRCode value={link}/>
          <div className="J-invite-qrcode-content invite-qrcode-content">
            <img className="invite-qrcode-content-bg" src="http://img-cows.kkkd.com/Fj8xN0aK10w_rLjCelZ6TWmk6JZe" alt="背景图"/>
            <div className="content-wrapper">
              <Deliver height="1rem" vertical={true} />
              <img className="avatar" crossOrigin="anonymous" src={avatarUrl} alt="头像"/>
              <Deliver height=".15rem" vertical={true} />
              <p className="name">{name}</p>
              <p className="invite-tip">邀请你一起赚钱</p>
              <Deliver height=".6rem" vertical={true}/>
              <img className="qrcode-wrapper" src={qrcodeUrl} alt="二维码"/>
              <Deliver height=".18rem" vertical={true} />
              <p className="desc">不投一分钱每天躺赚20-30元</p>
            </div>
          </div>
        </div>
        {
          show
            ? <div className="task-invite-modal">
                <div className="mask" onClick={hideModal} />
                <Deliver height="2.2rem" />
                <div className="invite-qrcode-img">
                  <img width="100%" height="100%" src={shareImgUrl} alt="分享图"/>
                  <Deliver height=".17rem" vertical={true} />
                  <p className="share-tip">长按二维码保存或分享</p>
                  <div className="close" onClick={hideModal}></div>
                </div>
              </div>
            : null
        }
      </div>
    )
  }
}

