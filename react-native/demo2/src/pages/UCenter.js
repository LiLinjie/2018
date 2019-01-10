import React from 'react';
import {View, Text, AsyncStorage, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../components/Button';
import { unitWidth } from '../utils/AdapterUtil';
import * as service from '../services/user';

export default class UCenterPage extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      userDetail: ''
    }
  }
  componentWillMount () {
    this.getUserInfo();
  }
  async logout () {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }
  async getUserInfo () {
    const res = await service.getUserDetail();
    console.log(res);
    if (res.status === 1) {
      this.setState({
        userDetail: res.data
      })
    }
  }
  render () {
    const { userDetail } = this.state;
    return (
      <View>
        <LinearGradient
          colors={["#FEAA96","#FF0F4C"]}
          useAngle={true}
          angle={41}
          style={styles.top}>
          <View style={styles.topContent}>
            <Image source={{uri: userDetail.avatar}} style={styles.avatar}/>
            <View style={styles.info}>
              <Text style={styles.name}>{userDetail.nickName}</Text>
              <Text style={styles.tel}>手机号:{userDetail.userName}</Text>
            </View>
          </View>
        </LinearGradient>
        <View style={[styles.center, {marginTop: unitWidth * 40}]}>
          <Button
            text="退出登录"
            onPress={() => this.logout()}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  top: {
    height: unitWidth * 378,
    padding: unitWidth * 35,
    paddingTop: unitWidth * 165
  },
  topContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: unitWidth * 140,
    height: unitWidth * 140,
    borderRadius: unitWidth * 140,
    marginRight: unitWidth * 30
  },
  info: {
    flex: 1
  },
  name: {
    fontSize: unitWidth * 48,
    lineHeight: unitWidth * 48,
    marginBottom: unitWidth * 15,
    color: '#fff'
  },
  tel: {
    fontSize: unitWidth * 24,
    lineHeight: unitWidth * 34,
    color: '#fff'
  },
  center: {
    alignItems: 'center',
  }
})
