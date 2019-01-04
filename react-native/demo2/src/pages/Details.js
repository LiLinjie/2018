import React from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
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
      info: ''
    }
  }

  componentWillMount () {
    this.getDetail();
  }

  async getDetail () {
    const { navigation } = this.props;
    const { comId } = navigation.state.params;
    const res = await service.getDetail({comId, agentId: 969});
    navigation.setParams({title: res.data.prodName})
    this.setState({
      info: res.data
    });
  }

  render () {
    const { info } = this.state;
    console.log(info);
    if (!info) {
      return (
        <PageLoading />
      )
    }

    return (
      <View style={styles.wrapper}>
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
            <Text>{info.prodName}</Text>
          </View>
          <View style={styles.priceWrapper}>
            <View style={styles.coupon}></View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  swiperWrapper: {
    width: unitWidth * 750,
    height: unitWidth * 750
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})
