import React from 'react';
import { View } from 'react-native';

const CardSection = props => {
  const styles = {
    containerStyle: {
      borderBottomWidth: 1,
      backgroundColor: props.color,
      justifyContent: 'flex-start',
      flexDirection: 'row',
      borderColor: '#ddd',
      position: 'relative'
    }
  };
  return <View style={[styles.containerStyle, props.style]}>{props.children}</View>;
};

export { CardSection };
