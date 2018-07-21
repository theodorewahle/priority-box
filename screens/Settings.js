import React from 'react';
import { AsyncStorage, Button, StatusBar, StyleSheet, View } from 'react-native';
import { logoutUser } from '../redux/auth/Api';
import { connect } from 'react-redux';

class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings'
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _signOutAsync = async () => {
    await this.props.logoutUser();
    this.props.navigation.navigate('Auth');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = ({ auth }) => {
  return { auth };
};

const mapDispatchToProps = {
  logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
