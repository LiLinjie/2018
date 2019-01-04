import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import {theme} from '../config/theme'

export default class PageLoading extends React.Component {
  render () {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={theme.themeColor} />
      </View>
    )
  }
}
