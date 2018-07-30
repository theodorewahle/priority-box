import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Colors from '../constants/Colors';
const DecisionBubble = ({ score, text }) => {
  const chooseColor = () => {
    if (score > 0.66) {
      return Colors.goodDecision;
    } else if (score < 0.33) {
      return Colors.badDecision;
    }
    return Colors.okayDecision;
  };

  const styles = StyleSheet.create({
    gridItem: {
      margin: 5,
      width: Dimensions.get('window').width / 2.2, //Device width divided in almost a half,
      height: 150,
      justifyContent: 'center',
      alignItems: 'center'
    },
    gridItemImage: {
      width: 100,
      height: 100,
      borderWidth: 1.5,
      borderColor: 'black',
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: chooseColor()
    },
    gridItemText: {
      marginTop: 5,
      textAlign: 'center'
    }
  });

  return (
    <TouchableOpacity style={styles.gridItem}>
      <View style={styles.gridItemImage}>
        <Text style={{ fontSize: 25 }}>{Math.round(score * 100)}%</Text>
      </View>
      <Text style={styles.gridItemText}>
        {text && text.length > 15 ? `${text.slice(0, 15)}...` : text || ''}
      </Text>
    </TouchableOpacity>
  );
};

export default DecisionBubble;
