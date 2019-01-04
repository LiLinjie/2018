import React from 'react';
import { View, Text, Button } from 'react-native';

export default class Home extends React.PureComponent {
  render () {
    return (
      <View>
        <Text>Home</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    )
  }
}
