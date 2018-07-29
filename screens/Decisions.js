import React, { Component } from 'react';
import { ScrollView, ListView, StyleSheet, Modal } from 'react-native';
import { connect } from 'react-redux';
import { Header, Button } from 'react-native-elements';
import { styles as s } from 'react-native-style-tachyons';

import { getDecisions } from '../redux/decisions/Api';
import DecisionFormCard from '../components/DecisionFormCard';
import DecisionBubble from '../components/DecisionBubble';
import { orderDecisions } from '../utils';

class Decisions extends Component {
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

  constructor() {
    super();
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      ds,
      composing: false
    };
  }

  async componentWillMount() {
    await this.props.getDecisions();
  }

  getDataSource = () => {
    if (!this.props.decisions) {
      return this.state.ds.cloneWithRows(['dataSource']);
    }
    const dataSource = orderDecisions(this.props.decisions);
    return this.state.ds.cloneWithRows(dataSource);
  };

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
          dataSource={this.getDataSource()}
          renderRow={item => <DecisionBubble score={item.score} text={item.name} />}
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
