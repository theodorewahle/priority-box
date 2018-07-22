import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Slider, Button } from 'react-native-elements';
import { styles as s } from 'react-native-style-tachyons';
import Colors from '../constants/Colors';
import { postDecision } from '../redux/decisions/Api';

class DecisionFormCard extends Component {
  state = {
    value: 0.5,
    priorityColors: {
      '1': {
        r: 127,
        g: 127,
        value: 0.5
      }
    }
  };

  handleSubmit() {
    return null;
  }

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
      } else {
        return `rgb(${priorityColors[id].r}, ${priorityColors[id].g}, 0)`;
      }
    }
    return 'grey';
  };

  render() {
    return (
      <View style={[s.pa3, s.ma10, s.bg_white, s.br5]}>
        <View style={[s.br5, s.pa2]}>
          <Text>How does this decision affect your priorites?</Text>
        </View>
        {Object.keys(this.props.priorities).map(key => {
          const priority = this.props.priorities[key];
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
                style={{ color: 'white' }}
                animationType="timing"
                thumbTintColor="white"
                value={priorityColors[id] ? priorityColors[id].value : this.state.value}
                onValueChange={value => this.sliderMove(value, id)}
              />
            </View>
          );
        })}
        <View s={[s.h10, s.br5]} />
        <Button
          title="Weigh Decision"
          buttonStyle={{
            borderRadius: 10
          }}
        />
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
