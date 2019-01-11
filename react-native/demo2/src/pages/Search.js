import React from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList, Image, TouchableHighlight, TextInput } from 'react-native';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
// import TitleBar from '../components/TitleBar';
import RefreshListView from '../components/Refresh/RefreshListView';
import RefreshState from '../components/Refresh/RefreshState';
import { width, unitWidth } from '../utils/AdapterUtil';
import { imgParser } from '../utils';
import * as service from '../services/product';
import { theme } from '../config/theme';

export default class IndexPage extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      list: [],
      page: 0,
      size: 20,
      keyword: ''
    }
  }
  componentDidMount () {
    this.listView.beginHeaderRefresh();
  }
  async getList () {
    let { page, size, keyword, list } = this.state;
    const params = {
      page,
      size,
      prodName: keyword || undefined
    }
    const res = await service.getProList(params);
    let prodList  = list.concat(res.data.data.data);
    const totalCount = res.data.data.totalItem;
    const currentCount = prodList.length;

    let footerState = RefreshState.Idle;
    if (currentCount < totalCount) {
      footerState = RefreshState.CanLoadMore;
      page ++;
    } else {
      footerState = RefreshState.NoMoreData;
    }
    this.setState({
      list: prodList,
      page
    });
    this.listView.endRefreshing(footerState);
  }
  onChangeText (params) {
    this.setState(params)
  }
  handleSearch () {
    this.setState({
      page: 0,
      list: []
    }, () => {
      this.getList();
    });
  }
  refresh () {
    this.setState({
      page: 0,
      list: []
    }, () => {
      this.getList();
    })
  }
  _keyExtractor = (item, index) => item.id.toString();
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
          <TextInput
            placeholder="输入关键词或粘贴宝贝标题"
            placeholderTextColor="#ffffffaa"
            style={styles.searchText}
            returnKeyType="search"
            onChangeText={(keyword) => this.onChangeText({keyword})}
            onSubmitEditing={() => this.handleSearch()}
          />
        </LinearGradient>
        {/*<FlatList
          data={list}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) => this._renderItem(item)}
        />*/}
        <RefreshListView
          ref={(ref) => {this.listView = ref}}
          data={list}
          renderItem={(item) => this._renderItem(item.item)}
          keyExtractor={this._keyExtractor}
          ListEmptyComponent={this._renderEmptyView}
          onHeaderRefresh={() => { this.refresh() }}
          onFooterRefresh={() => { this.getList() }}
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
  _renderEmptyView = (item) => {
    return <View/>
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
  searchText: {
    width: unitWidth * 710,
    height: unitWidth * 64,
    textAlign: 'center',
    fontSize: unitWidth * 28,
    color: '#fff',
    backgroundColor: 'rgba(248,248,248,.24)',
    borderRadius: unitWidth * 100,
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
