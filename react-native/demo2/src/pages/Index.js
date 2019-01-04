import React from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList, Image, TouchableHighlight } from 'react-native';
import Swiper from 'react-native-swiper';
// import TitleBar from '../components/TitleBar';
import { width, unitWidth } from '../utils/AdapterUtil';
import { imgParser } from '../utils';
import * as service from '../services/product';

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
        {/*<TitleBar title={'首页'} navigation={navigation} />*/}
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
      <TouchableHighlight onPress={() => this._toDetail(item)}>
        <View style={styles.item}>
          <Image source={{uri: imgParser(item.imageUrl, 240, 240)}}
                 style={styles.img} />
          <View style={styles.itemRight}>
            <Text>{item.prodName}</Text>
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
    flex: 1,
    flexDirection: 'row',
    width: width,
    marginBottom: unitWidth * 20,
    padding: unitWidth * 20,
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  img: {
    width: unitWidth * 240,
    height: unitWidth * 240,
    marginRight: unitWidth * 20,
    borderRadius: unitWidth * 10
  },
  itemRight: {

  }
})
