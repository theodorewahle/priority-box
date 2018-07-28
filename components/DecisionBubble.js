import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const DecisionBubble = ({ score }) => (
  <TouchableOpacity style={styles.gridItem}>
    <View style={styles.gridItemImage}>
      <Text style={{ fontSize: 25 }}>{score}</Text>
    </View>
    <Text style={styles.gridItemText}>{score}</Text>
  </TouchableOpacity>
);

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
    alignItems: 'center'
  },
  gridItemText: {
    marginTop: 5,
    textAlign: 'center'
  }
});

export default DecisionBubble;
