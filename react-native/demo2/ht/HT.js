import React from 'react';
import { View, Text, StatusBar } from 'react-native';

export default class HT extends React.PureComponent {
  render () {
    return (
      <View>
        <StatusBar hidden={true}/>
        <View style={{backgroundColor: 'red', height: 300, width: 300}} />
        <Text>海淘</Text>
      </View>
    )
  }
}
