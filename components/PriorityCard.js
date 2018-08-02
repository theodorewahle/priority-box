import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableWithoutFeedback, Platform } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { styles as s } from 'react-native-style-tachyons';
import { deletePriority, getPriorities, updatePriorities } from '../redux/priorities/Api';
import Colors from '../constants/Colors';

class PriorityCard extends React.Component {
  state = {
    open: false
  };

  handleMoveUp = async () => {
    const { priorities, priority } = this.props;
    const currentRank = priority.rank;
    const newObject = Object.assign({}, priorities);
    await Object.keys(newObject).map(id => {
      if (priorities[id].rank === currentRank && currentRank !== 1) {
        newObject[id].rank = currentRank - 1;
      } else if (priorities[id].rank === currentRank - 1) {
        newObject[id].rank = currentRank;
      }
    });
    await updatePriorities(newObject);
    this.setState({ open: false });
  };

  handleMoveDown = async () => {
    if (this.props.priority.rank !== this.props.priorityNumber) {
      const { priorities, priority } = this.props;
      const currentRank = priority.rank;
      const newObject = Object.assign({}, priorities);
      await Object.keys(newObject).map(id => {
        if (priorities[id].rank === currentRank && currentRank !== 7) {
          newObject[id].rank = currentRank + 1;
        } else if (priorities[id].rank === currentRank + 1) {
          newObject[id].rank = currentRank;
        }
      });
      await updatePriorities(newObject);
      this.setState({ open: false });
    }
  };

  handleDelete = async () => {
    const { priorities, priority } = this.props;
    const delKey = Object.keys(priorities).filter(key => priorities[key].rank === priority.rank); // should be key of obj with rank 3
    await deletePriority(delKey); // delete the key
    const newObject = Object.assign({}, priorities); //sould be the objecy
    delete newObject[delKey];
    await Object.keys(newObject).map(id => {
      if (priorities[id].rank >= priority.rank) {
        newObject[id].rank = priorities[id].rank - 1;
      }
    });
    updatePriorities(newObject);
    this.setState({ open: false });
  };

  renderButtonPanel = () => {
    if (this.state.open) {
      return (
        <View style={[s.jcsb, s.flx_row, { backgroundColor: Colors.smoke }, s.mh4, s.pa1]}>
          {this.props.priority.rank !== 1 &&
            this.props.priorityNumber > 1 && (
              <View style={[s.aic]}>
                <Button
                  icon={{ name: 'arrow-upward' }}
                  buttonStyle={[{ backgroundColor: Colors.darkestBlue }, s.br5, s.pl3, s.pr2]}
                  onPress={this.handleMoveUp}
                />
              </View>
            )}
          <View style={[s.aic]}>
            <Button
              title="delete"
              buttonStyle={[{ backgroundColor: 'red' }, s.br5, s.pl3, s.pr3]}
              onPress={this.handleDelete}
            />
          </View>
          {this.props.priority.rank !== this.props.priorityNumber && (
            <View style={[s.aic]}>
              {this.props.key !== this.props.priorityNumber && (
                <Button
                  icon={{ name: 'arrow-downward' }}
                  buttonStyle={[{ backgroundColor: Colors.darkestBlue }, s.br5, s.pl3, s.pr2]}
                  onPress={this.handleMoveDown}
                />
              )}
            </View>
          )}
        </View>
      );
    }
  };

  render() {
    return (
      <View
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 2,
            borderRadius: 3,
            elevation: 1,
            marginLeft: Platform.OS === 'android' ? 20 : 0,
            marginRight: Platform.OS === 'android' ? 20 : 0
          },
          s.mb1
        ]}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({ open: !this.state.open });
          }}>
          <View
            style={[
              s.jcsb,
              s.flx_row,
              s.mh3,
              { backgroundColor: Platform.OS === 'ios' ? 'white' : null },
              s.pv3,
              s.ph2
            ]}>
            <Text style={[s.f3, s.black, s.pr2]}>{this.props.priority.text}</Text>
          </View>
        </TouchableWithoutFeedback>

        <View>{this.renderButtonPanel()}</View>
      </View>
    );
  }
}

const mapStateToProps = ({ priorities }) => ({ priorities });

const mapDispatchToProps = {
  deletePriority,
  getPriorities
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PriorityCard);
