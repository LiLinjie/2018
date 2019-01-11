/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Navigator, Image, AsyncStorage, ActivityIndicator, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Transitioner ,createStackNavigator, createBottomTabNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';


import Index from './src/pages/Index';
import UCenter from './src/pages/UCenter';
import Details from './src/pages/Details';
import Login from './src/pages/Login';
import { theme } from './src/config/theme';
import * as service from './src/services/user';
import PageLoading from './src/components/PageLoading';

const AuthStack = createStackNavigator({ Login });

const TabNavigator = createBottomTabNavigator({
  Index: {
    screen: Index,
    navigationOptions: {
      tabBarLabel: '首页',
      tabBarIcon: ({focused, tintColor}) => (
        <Icon name={`ios-home`} size={25} color={tintColor}/>
      )
    }
  },
  Search: {
    screen: Index,
    navigationOptions: {
      tabBarLabel: '搜索',
      tabBarIcon: ({focused, tintColor}) => (
        <Icon name={`ios-search`} size={25} color={tintColor}/>
      )
    }
  },
  UCenter: {
    screen: UCenter,
    navigationOptions: {
      tabBarLabel: '个人中心',
      tabBarIcon: ({focused, tintColor}) => (
        <Icon name={`ios-person`} size={25} color={tintColor}/>
      )
    }
  }
}, {
    tabBarOptions: {
      activeTintColor: theme.themeColor,
      inactiveTintColor: 'gray'
    }
});
const AppContainer = createStackNavigator({
  TabNavigator: {
    screen: TabNavigator,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  Details
});

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userDetail: ''
    };
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    let userDetail = await AsyncStorage.getItem('userDetail');
    if (userToken) {
      !userDetail && await this.getUserInfo();
      this.props.navigation.navigate('App');
    } else {
      this.props.navigation.navigate('Auth');
    }

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
  };

  getUserInfo = async () => {
    const res = await service.getUserDetail();
    if (res.status === 1) {
      await AsyncStorage.setItem('userDetail', JSON.stringify(res.data));
      this.setState({
        userDetail: res.data
      })
    }
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <PageLoading />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppContainer,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

