import React, { Component } from 'react';
import { View, Text, TextInput, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Slider, Button } from 'react-native-elements';
import { styles as s } from 'react-native-style-tachyons';
import { postDecision } from '../redux/decisions/Api';
import CalculateDecisionScore from '../utils/CalculateDecisionScore';
import { orderPriorities } from '../utils';
import Colors from '../constants/Colors';

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
    const keys = Object.keys(priorities).filter(key => priorities[key].rank <= 7);
    keys.map(priorityKey => {
      const { text, rank } = priorities[priorityKey];
      subScores[text] = sliderValues[rank] ? sliderValues[rank].value : 0.5;
    });
    const decisionResults = { score, subScores, name: this.state.name, date: new Date().toString() };
    if (score) {
      await this.props.postDecision(decisionResults);
    }
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
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 2,
          borderRadius: 3,
          elevation: 1
        }}>
        {this.state.step === 1 && (
          <View style={[s.ph4, s.pv4, s.bg_white, s.br5, { elevation: 1 }]}>
            <View style={[s.br5, s.pa2]}>
              <Text style={[s.f5]}>What decision are you making?</Text>
            </View>
            <View style={[s.br5, s.pa3, s.mb2]}>
              <TextInput
                style={[Platform.OS == 'android' ? s.pa3 : null]}
                onChangeText={name => this.setState({ name })}
                placeholder={`${'"Get a gym membership"'}`}
                maxLength={35}
              />
            </View>
            <Button
              title="Next"
              buttonStyle={{
                borderRadius: 10,
                backgroundColor: Colors.mediumBlue
              }}
              onPress={() => this.setState({ step: 2 })}
            />
          </View>
        )}

        {this.state.step === 2 && (
          <View
            style={[
              s.pa3,
              s.br5,
              s.aic,
              s.mh3,
              { backgroundColor: 'white', elevation: 1, width: Platform.OS === 'android' ? '100%' : null }
            ]}>
            <View style={[s.br5, s.pa2]}>
              {Object.keys(this.props.priorities).length < 7 && (
                <Text style={[s.f8]}>How does this decision affect your priorities?</Text>
              )}
              {Object.keys(this.props.priorities).length > 7 && (
                <Text style={[s.f8]}>How does this decision affect your top priorities?</Text>
              )}
              <Text style={[s.f3, s.asc, s.mv2]}>{this.state.name}</Text>
              <View style={[s.jcsb, s.flx_row]}>
                <Text>Negative</Text>
                <Text>Positive</Text>
              </View>
            </View>
            {orderPriorities(this.props.priorities)
              .filter(priority => priority.rank <= 7)
              .map(priority => {
                const id = priority.rank;
                const { priorityColors } = this.state;
                return (
                  <View
                    key={id}
                    style={[
                      s.pv1,
                      s.ph1,
                      s.mb1,
                      s.min_w5,
                      {
                        backgroundColor: this.chooseColor(priorityColors, id),
                        borderRadius: 10
                      }
                    ]}>
                    <Text style={[s.black]}>{priority.text}</Text>
                    <Slider
                      style={{ height: 35 }}
                      animationType="timing"
                      thumbTintColor="black"
                      value={priorityColors[id] ? priorityColors[id].value : this.state.value}
                      onValueChange={value => this.sliderMove(value, id)}
                    />
                  </View>
                );
              })}

            <Button
              title="Weigh Decision"
              buttonStyle={{
                borderRadius: 10 ,
                backgroundColor: Colors.mediumBlue
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
