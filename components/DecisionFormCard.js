import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Slider, Button } from 'react-native-elements';
import { styles as s } from 'react-native-style-tachyons';

import { postDecision } from '../redux/decisions/Api';

class DecisionFormCard extends Component {
  state = {
    value: 0
  };
  handleSubmit() {
    return null;
  }

  render() {
    return (
      <View style={[s.pa5, s.ba3, s.b__black, s.bg__blue]}>
        <Slider value={this.state.value} onValueChange={value => this.setState({ value })} />
        <Text>Value: {this.state.value}</Text>
        <Button title="Weigh Decision" />
      </View>
    );
  }
}

const mapStateToProps = ({ priorities, decisions }) => {
  return { priorities, decisions };
};

const mapDispatchToProps = {
  postDecision
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DecisionFormCard);
