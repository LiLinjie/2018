import React from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList, Image, TouchableHighlight } from 'react-native';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
// import TitleBar from '../components/TitleBar';
import { width, unitWidth } from '../utils/AdapterUtil';
import { imgParser } from '../utils';
import * as service from '../services/product';
import { theme } from '../config/theme';

export default class IndexPage extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      list: []
    }
  }
  componentWillMount () {
    this.getList();
  }
  async getList () {
    const res = await service.getProList({page: 0, size: 10});
    const list  = res.data.data.data;
    this.setState({
      list
    });
  }
  _keyExtractor = (item, index) => item.id;
  render () {
    const { navigation } = this.props;
    const { list } = this.state;
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["#FF6C78","#FF0F4C"]}
          useAngle={true}
          angle={65}
          style={styles.searchWrapper}>
          <View style={styles.search}>
            <Text style={styles.searchText}>输入关键词或粘贴宝贝标题</Text>
          </View>
        </LinearGradient>
        <FlatList
          data={list}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) => this._renderItem(item)}
        />
      </View>
    )
  }
  _toDetail (item) {
    this.props.navigation.navigate('Details', {
      comId: item.id
    })
  }
  _renderItem (item) {
    return (
      <TouchableHighlight onPress ={() => this._toDetail(item)}>
        <View style={styles.item}>
          <Image source={{uri: imgParser(item.imageUrl, 240, 240)}}
                 style={styles.img} />
          <View style={styles.itemRight}>
            <View style={{flex: 1}}>
              <Text numberOfLines={1} style={styles.itemName}>{item.prodName}</Text>
              <View style={styles.itemInfo}>
                <Text style={styles.itemCoupon}>券：{item.couponPrice}元</Text>
                <Text style={styles.count}>销量:{item.salesQuantity > 9999 ? '9999+' : item.salesQuantity}</Text>
              </View>
            </View>
            <View style={styles.itemBottom}>
              <Text>券后：￥<Text style={styles.priceText}>{item.promotionPrice}</Text></Text>
              <Text style={styles.getCoupon}>点击领券</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8'
  },
  item: {
    flexDirection: 'row',
    width: width,
    marginBottom: unitWidth * 20,
    padding: unitWidth * 20,
    backgroundColor: '#fff'
  },
  img: {
    width: unitWidth * 240,
    height: unitWidth * 240,
    marginRight: unitWidth * 20,
    borderRadius: unitWidth * 10
  },
  itemRight: {
    width: unitWidth * 450
  },
  itemName: {
    fontSize: unitWidth * 32,
    color: theme.fontColor,
    marginBottom: unitWidth * 16
  },
  searchWrapper: {
    height: unitWidth * 88,
    justifyContent: 'center',
    alignItems: 'center'
  },
  search: {
    width: unitWidth * 710,
    height: unitWidth * 64,
    backgroundColor: 'rgba(248,248,248,.24)',
    borderRadius: unitWidth * 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchText: {
    fontSize: unitWidth * 28,
    color: '#fff'
  },
  itemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemCoupon: {
    paddingLeft: unitWidth * 20,
    paddingRight: unitWidth * 20,
    fontSize: unitWidth * 24,
    lineHeight: unitWidth * 40,
    backgroundColor: '#ffdbdb',
    color: theme.themeColor,
    borderRadius: unitWidth * 6
  },
  count: {
    fontSize: unitWidth * 26,
    color: theme.fontColor2
  },
  itemBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  priceText: {
    fontSize: unitWidth * 40,
    fontWeight: 'bold',
    color: theme.themeColor,
  },
  getCoupon: {
    width: unitWidth * 132,
    height: unitWidth * 56,
    lineHeight: unitWidth * 56,
    textAlign: 'center',
    color: '#fff',
    fontSize: unitWidth * 24,
    backgroundColor: theme.themeColor,
    borderRadius: unitWidth * 100
  }
})
