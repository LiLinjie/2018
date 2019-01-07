import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import {theme} from '../config/theme'
import {unitWidth} from '../utils/AdapterUtil'

export default class Button extends Component {
  static propTypes = {
    ...TouchableOpacity.propTypes,
    accessibilityLabel: PropTypes.string,
    allowFontScaling: Text.propTypes.allowFontScaling,
    containerStyle: ViewPropTypes.style,
    disabledContainerStyle: ViewPropTypes.style,
    disabled: PropTypes.bool,
    style: Text.propTypes.style,
    styleDisabled: Text.propTypes.style,
    childGroupStyle: ViewPropTypes.style,
  }

  render () {
    const {
      text = '确定',
      backgroundColor,
      disabled,
      onPress = () => {}
    } = this.props;
    return (
      <TouchableOpacity
        disabled={disabled}
        style={[styles.button, disabled && styles.disabled, !!backgroundColor && {backgroundColor}]}
        onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    width: unitWidth * 600,
    height: unitWidth * 88,
    justifyContent: 'center',
    backgroundColor: theme.themeColor,
    borderRadius: unitWidth * 100,
    overflow: 'hidden'
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: unitWidth * 34
  },
  disabled: {
    backgroundColor: 'gray'
  }
})
