import React, { Component } from 'react';
import { View, Text, AsyncStorage, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../redux/auth/Api';
import { Card, CardSection, Input, Spinner } from '../components/common';
import { Header, Button } from 'react-native-elements';
import { styles as s } from 'react-native-style-tachyons';

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Auth',
      header: (
        <Header
          outerContainerStyles={{
            height: 80,
            borderBottomWidth: 0,
            justifyContent: 'space-between'
          }}
          centerComponent={{ text: 'Priority Box', style: [s.white, s.f5] }}
          backgroundColor="green"
        />
      )
    };
  };

  onEmailChange(email) {
    this.setState({ email });
  }

  onPasswordChange(password) {
    this.setState({ password });
  }

  onButtonPress = () => {
    this.props.loginUser(this.state.email, this.state.password, this.props.navigation);
  };

  renderButton() {
    if (this.props.auth.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button title="Log In" onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.state.email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.state.password}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>{this.props.auth.error}</Text>

        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

const mapDispatchToProps = {
  emailChanged,
  passwordChanged,
  loginUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
