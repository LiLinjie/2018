import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import RefreshState from './RefreshFooter';

export default class RefreshFooter extends Component {
  static propTypes = {
    onLoadMore: PropTypes.func,
    onRetryLoading: PropTypes.func,
  };

  static defaultProps = {
    refreshingText: '正在努力加载中...',
    loadMoreText: '上拉加载更多',
    failureText: '点击加载更多',
    noMoreDataText: '没有更多啦'
  };

  render () {
    let { state } = this.props;
    let footer = null;
    switch (state) {
      case RefreshState.Idle:
        break;
      case RefreshState.Refreshing:
        footer = (
          <View style={styles.loadingView}>
            <ActivityIndicator size="small"/>
            <Text style={styles.refreshingText}>{this.props.refreshingText}</Text>
          </View>
        );
        break;
      case RefreshState.CanLoadMore:
        footer = (
          <View style={styles.loadingView}>
            <Text style={styles.footerText}>{this.props.loadMoreText}</Text>
          </View>
        );
        break;
      case RefreshState.NoMoreData:
        footer = (
          <View style={styles.loadingView}>
            <Text style={styles.footerText}>{this.props.noMoreDataText}</Text>
          </View>
        );
        break;
      case RefreshState.Failure:
        footer = (
          <TouchableOpacity style={styles.loadingView} onPress={()=>{
            this.props.onRetryLoading && this.props.onRetryLoading();
          }}>
            <Text style={styles.footerText}>{this.props.failureText}</Text>
          </TouchableOpacity>
        );
        break;
    }
    return footer;
  }
}

const styles = StyleSheet.create({
  loadingView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  refreshingText: {
    fontSize: 12,
    color: "#666666",
    paddingLeft: 10,
  },
  footerText: {
    fontSize: 12,
    color: "#666666"
  }
});
