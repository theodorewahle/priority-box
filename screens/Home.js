import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  AsyncStorage,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection } from '../components/common';
import { Header, Button, Icon } from 'react-native-elements';
import { getPriorities } from '../redux/priorities/Api';
import PriorityCard from '../components/PriorityCard';

import { styles as s } from 'react-native-style-tachyons';

import list_order from '../assets/animations/list_order.json';

class Home extends React.Component {
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
          leftComponent={
            <Icon name="settings" type="material" onPress={() => navigation.navigate('Settings')} />
          }
          rightComponent={
            <Icon name="edit" type="material" onPress={() => navigation.navigate('PriorityForm')} />
          }
          centerComponent={{ text: 'Priorities', style: [s.white, s.f5] }}
          backgroundColor="green"
        />
      )
    };
  };

  async componentDidMount() {
    await this.props.getPriorities();
  }

  render() {
    const { priorities } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {Object.keys(priorities).map(uniqueHash => (
            <PriorityCard
              key={priorities[uniqueHash].rank}
              priority={priorities[uniqueHash]}
              priorityNumber={Object.keys(priorities).length}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    paddingTop: 10
  },
  cardSectionHeaderStyle: {
    borderRadius: 6,
    backgroundColor: 'white',
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderColor: 'black',
    maxHeight: 20
  }
});

const mapStateToProps = ({ priorities, auth }) => {
  return { priorities, auth };
};

const mapDispatchToProps = {
  getPriorities
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
