import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { styles as s } from 'react-native-style-tachyons';
import { decreasePriority, increasePriority, deletePriority } from '../redux/priorities/Api';

class PriorityCard extends React.Component {
  state = {
    open: false
  };

  handleMoveUp = async () => {
    const { key } = this.props;
    await increasePriority(key);
    await decreasePriority(key - 1);
  };

  handleMoveDown = async () => {
    const { key } = this.props;
    await increasePriority(key);
    await decreasePriority(key - 1);
  };

  handleDelete = async () => {
    const { key } = this.props;
    await increasePriority(key);
    await decreasePriority(key - 1);
    await deletePriority(key);
  };

  renderButtonPanel = () => {
    if (this.state.open) {
      return (
        <View style={[s.jcsb, s.flx_row, s.mh4, s.mt2]}>
          <View style={[s.aic]}>
            <Button
              icon={{ name: 'arrow-upward' }}
              buttonStyle={[{ backgroundColor: 'blue' }, s.br5, s.pl3, s.pr2]}
              onPress={this.handleMoveUp}
            />
          </View>
          <View style={[s.aic]}>
            <Button
              title="delete"
              buttonStyle={[{ backgroundColor: 'red' }, s.br5, s.pl3, s.pr3]}
              onPress={this.handleDelete}
            />
          </View>
          <View style={[s.aic]}>
            {this.props.key !== this.props.priorityNumber && (
              <Button
                icon={{ name: 'arrow-downward' }}
                buttonStyle={[{ backgroundColor: 'blue' }, s.br5, s.pl3, s.pr2]}
                onPress={this.handleMoveDown}
              />
            )}
          </View>
        </View>
      );
    }
  };

  render() {
    return (
      <View>
        <View style={[s.jcsb, s.flx_row, s.mh3]}>
          <View>
            <Text style={[s.f3, s.black, s.pr2]}>{this.props.priority.text}</Text>
          </View>
          <Icon
            name="menu"
            type="material"
            onPress={() => {
              this.setState({ open: !this.state.open });
            }}
          />
        </View>
        {this.renderButtonPanel()}
      </View>
    );
  }
}

const mapStateToProps = state => null;

const mapDispatchToProps = {
  decreasePriority,
  increasePriority,
  deletePriority
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PriorityCard);
