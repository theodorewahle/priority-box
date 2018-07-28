import React from 'react';
import { View } from 'react-native';

const CardSection = props => {
  const styles = {
    containerStyle: {
      backgroundColor: props.color,
      justifyContent: 'flex-start',
      flexDirection: 'row',
      position: 'relative'
    }
  };
  return <View style={[styles.containerStyle, props.style]}>{props.children}</View>;
};

export { CardSection };
