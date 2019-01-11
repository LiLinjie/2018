import React from 'react';
import { View, Text, StyleSheet, Image, WebView, TouchableOpacity, ScrollView, Linking, AsyncStorage } from 'react-native';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import PageLoading from '../components/PageLoading';
import { width, unitWidth } from '../utils/AdapterUtil';
import * as service from '../services/product';
import {imgParser} from '../utils';
import { theme } from '../config/theme';

export default class DetailsPage extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Loading...')
    }
  }
  constructor (props) {
    super(props);
    this.state = {
      info: '',
      html: '',
      height: 500,
      isShowDetailItems: false,
      userDetail: ''
    }
  }

  componentWillMount () {
    this.getDetail();
    this.getDetailHtml();
  }

  async getDetail () {
    const { navigation } = this.props;
    const { comId } = navigation.state.params;
    const userDetail = await AsyncStorage.getItem('userDetail');
    let agentId;
    if (userDetail) {
      agentId = JSON.parse(userDetail).agentId;
    }
    this.setState({
      userDetail: JSON.parse(userDetail)
    });
    const res = await service.getDetail({comId, agentId});
    navigation.setParams({title: res.data.prodName})
    this.setState({
      info: res.data
    });
  }

  async getDetailHtml () {
    if (this.state.html) {
      this.setState({
        isShowDetailItems: !this.state.isShowDetailItems
      });
    } else {
      const { navigation } = this.props;
      const { comId } = navigation.state.params;
      const res = await service.getDetailItem({comId});
      this.setState({
        html: res.data,
        isShowDetailItems: true
      });
    }
  }

  linkTo () {
    if (this.state.userDetail) {
      Linking.openURL(this.state.info.recommendUrl);
    } else {
      this.props.navigation.navigate('Auth');
    }
  }

  render () {
    const { info, html, height } = this.state;
    const { navigation } = this.props;
    if (!info) {
      return (
        <PageLoading />
      )
    }
    return (
      <View style={styles.wrapper}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.swiperWrapper}>
            <Swiper style={styles.wrapper} autoplay={true} dotColor={'#ffffff70'} activeDotColor={theme.themeColor}>
              {
                info.imageUrls.map((item, index) => {
                  return (
                    <Image key={index} source={{uri: imgParser(item)}} style={{width: unitWidth * 750, height: unitWidth * 750}} />
                  )
                })
              }
            </Swiper>
          </View>
          <View style={styles.infoWrapper}>
            <View style={styles.name}>
              <Text style={styles.nameText}>{info.prodName}</Text>
            </View>
            <View style={styles.info}>
              <View style={styles.priceWrapper}>
                <Text style={styles.coupon}>券：{info.couponPrice}元</Text>
                <Text>券后:<Text style={styles.priceText}>{info.promotionPrice}</Text></Text>
                <Text style={styles.oldPrice}>{info.salesPrice}</Text>
              </View>
              <Text style={styles.count}>销量:{info.salesQuantity > 9999 ? '9999+' : info.salesQuantity}</Text>
            </View>
          </View>

          <View style={styles.detailWrapper}>
            <View style={{height}}>
              <WebView
                source={{html: `<!DOCTYPE html><html><head><meta charset="UTF-8" /><style>*{margin:0;padding:0;}img{max-width: 100%;vertical-align: top}</style></head><body>${html}<script>window.onload=function(){window.location.hash = 1;document.title = document.body.clientHeight;}</script></body></html>`}}
                style={{flex:1}}
                bounces={false}
                scrollEnabled={false}
                automaticallyAdjustContentInsets={true}
                contentInset={{top:0,left:0}}
                onNavigationStateChange={(title)=>{
                  if(title.title != undefined) {
                    this.setState({
                      height:(parseInt(title.title)+20)
                    })
                  }
                }}
              >
              </WebView>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.homeBtn}
            onPress={() => navigation.navigate('Index')}
          >
            <Text>首页</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.shareBtn}
          >
            <LinearGradient
              colors={["#FF8393","#FDAA94"]}
              useAngle={true}
              angle={90}
              style={styles.btnBg}>
              <Text style={styles.btnText}>分享</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.getCouponBtn}
            onPress={() => this.linkTo()}
          >
            <LinearGradient
              colors={["#FF4971","#FE0C41"]}
              useAngle={true}
              angle={90}
              style={styles.btnBg}>
              <Text style={styles.btnText}>领券省￥{info.couponPrice}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f8f8f8'
  },
  swiperWrapper: {
    width: unitWidth * 750,
    height: unitWidth * 750
  },
  infoWrapper: {
    padding: unitWidth * 20,
    marginBottom: unitWidth * 20,
    backgroundColor: '#fff'
  },
  nameText: {
    fontSize: unitWidth * 30,
    lineHeight: unitWidth * 38,
    color: theme.fontColor,
    marginBottom: unitWidth * 20
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceWrapper:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  coupon: {
    paddingLeft: unitWidth * 15,
    paddingRight: unitWidth * 15,
    marginRight: unitWidth * 10,
    fontSize: unitWidth * 24,
    lineHeight: unitWidth * 40,
    backgroundColor: '#ffdbdb',
    color: theme.themeColor,
    borderRadius: unitWidth * 6
  },
  priceText: {
    color: theme.themeColor,
    fontSize: unitWidth * 36,
    fontWeight: 'bold'
  },
  oldPrice: {
    marginLeft: unitWidth * 6,
    color: theme.fontColor2,
    fontSize: unitWidth * 24,
    lineHeight: unitWidth * 34,
    textDecorationLine: 'line-through'
  },
  count: {
    maxWidth: unitWidth * 130,
    textAlign: 'right',
    color: theme.fontColor2,
    fontSize: unitWidth * 24,
    lineHeight: unitWidth * 34
  },
  detailWrapper: {
  },
  footer: {
    flexDirection: 'row',
    height: unitWidth * 98,
    justifyContent: 'center',
    alignItems: 'center'
  },
  homeBtn: {
    width: unitWidth * 130,
    height: unitWidth * 98,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    color: '#fff',
    fontSize: unitWidth * 32
  },
  btnBg: {
    justifyContent: 'center',
    alignItems: 'center',
    width: unitWidth * 310,
    height: unitWidth * 98,
  }
})
