import React, { Component } from 'react';
import { View, ScrollView, ListView, StyleSheet, Modal } from 'react-native';
import { connect } from 'react-redux';
import { Header, Icon, Button } from 'react-native-elements';
import { styles as s } from 'react-native-style-tachyons';

import { getDecisions } from '../redux/decisions/Api';
import DecisionFormCard from '../components/DecisionFormCard';
import DecisionBubble from '../components/DecisionBubble';

class Decisions extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      composing: false,
      dataSource: ds.cloneWithRows(['87%', '64%'])
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    header: (
      <Header
        outerContainerStyles={{
          height: 80,
          borderBottomWidth: 0,
          justifyContent: 'space-between'
        }}
        centerComponent={{ text: 'Decisions', style: [s.white, s.f5] }}
        backgroundColor="green"
      />
    )
  });

  render() {
    return (
      <ScrollView style={{ backgroundColor: '#E8E8E8', flex: 1 }}>
        <Button
          title="Make New Decision"
          buttonStyle={{
            borderRadius: 10,
            marginTop: 20
          }}
          onPress={() => this.setState({ composing: true })}
        />
        <ListView
          contentContainerStyle={styles.grid}
          dataSource={this.state.dataSource}
          renderRow={item => <DecisionBubble score={item} />}
        />
        <Modal
          animationType="slide"
          transparent
          visible={this.state.composing}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <DecisionFormCard onClose={() => this.setState({ composing: false })} />
        </Modal>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ decisions }) => ({ decisions });

const mapDispatchToProps = {
  getDecisions
};
const styles = StyleSheet.create({
  grid: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Decisions);
