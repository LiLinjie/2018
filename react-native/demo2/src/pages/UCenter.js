import React from 'react';
import {View, Text, Button, AsyncStorage} from 'react-native'

export default class UCenterPage extends React.PureComponent {
  async logout () {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }
  render () {
    return (
      <View>
        <Button
          title="退出登录"
          onPress={() => this.logout()}
        />
      </View>
    )
  }
}
