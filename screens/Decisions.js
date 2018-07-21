import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Header, Button, Icon } from 'react-native-elements';
import { getDecisions } from '../redux/decisions/Api';
import { styles as s } from 'react-native-style-tachyons';
import DecisionFormCard from '../components/DecisionFormCard';

class Decisions extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Home',
      header: (
        <Header
          outerContainerStyles={{
            height: 80,
            borderBottomWidth: 0,
            justifyContent: 'space-between'
          }}
          rightComponent={
            <Icon name="edit" type="material" onPress={() => navigation.navigate('PriorityForm')} />
          }
          centerComponent={{ text: 'Decisions', style: [s.white, s.f5] }}
          backgroundColor="green"
        />
      )
    };
  };

  render() {
    return (
      <View style={[s.pt20]}>
        <DecisionFormCard />
      </View>
    );
  }
}

const mapStateToProps = ({ decisions }) => {
  return { decisions };
};

const mapDispatchToProps = {
  getDecisions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Decisions);
