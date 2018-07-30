import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Slider, Button } from 'react-native-elements';
import { styles as s } from 'react-native-style-tachyons';
import { postDecision } from '../redux/decisions/Api';
import CalculateDecisionScore from '../utils/CalculateDecisionScore';
import { orderPriorities } from '../utils';

class DecisionFormCard extends Component {
  state = {
    value: 0.5,
    step: 1,
    priorityColors: {},
    name: ''
  };

  handleSubmit = async sliderValues => {
    const { priorities } = this.props;
    this.props.onClose();
    const score = await CalculateDecisionScore(sliderValues, priorities);
    const subScores = {};
    Object.keys(priorities).map(priorityKey => {
      const { text, rank } = priorities[priorityKey];
      subScores[text] = sliderValues[rank] ? sliderValues[rank].value : 0.5;
    });
    const decisionResults = { score, subScores, name: this.state.name };
    await this.props.postDecision(decisionResults);
  };

  sliderMove = (value, id) => {
    const r = 255 - value * 255;
    const g = 255 * value;
    const oldState = Object.assign({}, this.state.priorityColors);
    oldState[id] = { r, g, value };
    this.setState({ priorityColors: oldState });
  };

  chooseColor = (priorityColors, id) => {
    if (priorityColors[id]) {
      if (priorityColors[id].r < 145 && priorityColors[id].g < 145) {
        return 'grey';
      }
      return `rgb(${priorityColors[id].r}, ${priorityColors[id].g}, 0)`;
    }
    return 'grey';
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        {this.state.step === 1 && (
          <View style={[s.ph4, s.pv4, s.bg_white, s.br5]}>
            <View style={[s.br5, s.pa2]}>
              <Text style={[s.f5]}>What decision are you making?</Text>
            </View>
            <View style={[s.br5, s.pa3, s.mb2]}>
              <TextInput
                onChangeText={name => this.setState({ name })}
                placeholder={`${'"Get a gym membership"'}`}
                maxLength={30}
              />
            </View>
            <Button
              title="Next"
              buttonStyle={{
                borderRadius: 10
              }}
              onPress={() => this.setState({ step: 2 })}
            />
          </View>
        )}

        {this.state.step === 2 && (
          <View style={[s.pa3, s.ma10, s.bg_white, s.br5]}>
            <View style={[s.br5, s.pa2]}>
              <Text style={[s.f8]}>How does this decision affect your priorities?</Text>
              <Text style={[s.f3, s.asc, s.mv2]}>{this.state.name}</Text>
            </View>
            {orderPriorities(this.props.priorities).map(priority => {
              const id = priority.rank;
              const { priorityColors } = this.state;
              return (
                <View
                  key={id}
                  style={{
                    paddingTop: 2,
                    paddingBottom: 2,
                    paddingLeft: 5,
                    paddingRight: 5,
                    borderRadius: 10,
                    marginBottom: 5,
                    backgroundColor: this.chooseColor(priorityColors, id)
                  }}>
                  <Text style={[s.white]}>{priority.text}</Text>
                  <Slider
                    animationType="timing"
                    thumbTintColor="white"
                    value={priorityColors[id] ? priorityColors[id].value : this.state.value}
                    onValueChange={value => this.sliderMove(value, id)}
                  />
                </View>
              );
            })}

            <Button
              title="Weigh Decision"
              buttonStyle={{
                borderRadius: 10
              }}
              onPress={() => this.handleSubmit(this.state.priorityColors)}
            />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({ priorities, decisions }) => ({ priorities, decisions });

const mapDispatchToProps = {
  postDecision
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DecisionFormCard);
