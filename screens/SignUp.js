import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput as Input, Image } from 'react-native';
import { connect } from 'react-redux';
import { loginUser } from '../redux/auth/Api';
import { emailChanged, passwordChanged } from '../redux/auth/Actions';

import { Spinner } from '../components/common';
import { Button } from 'react-native-elements';
import { styles as s } from 'react-native-style-tachyons';
import logo from '../assets/images/icon.png';
import Colors from '../constants/Colors';

class SignUp extends Component {
  static navigationOptions = {
    header: null
  };

  onEmailChange(text) {
    this.props.emailChanged(text.toLowerCase());
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text.toLowerCase());
  }

  onButtonPress = async () => {
    await this.props.loginUser(this.props.auth.email, this.props.auth.password);
    this.props.navigation.navigate('App');
  };

  renderButton() {
    if (this.props.auth.loading) {
      return <Spinner size="large" />;
    }

    return (
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <Button
          text="Sign Up"
          title="Sign Up"
          buttonStyle={{
            borderRadius: 10,
            width: '100%',
            backgroundColor: Colors.mediumBlue
          }}
          onPress={this.onButtonPress.bind(this)}>
          Login
        </Button>
      </View>
    );
  }

  render() {
    return (
      <View style={[{ backgroundColor: 'white', height: '100%' }, s.aic]}>
        <Image style={[{ height: 300, width: '100%' }, s.mt5, s.mb3]} source={logo} />
        <View
          style={[
            {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 2,
              borderRadius: 3,
              width: '100%'
            },
            s.mb1
          ]}>
          <View style={[s.jcsb, s.flx_row, s.mh3, s.bg_white, s.ph2, s.pv3]}>
            <Input
              style={([s.h2, s.tac, s.f5], { textAlign: 'center', width: '100%' })}
              label="Email"
              placeholder="email"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.auth.email}
            />
          </View>
        </View>

        <View
          style={[
            {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 2,
              borderRadius: 3,
              width: '100%'
            },
            s.mb1
          ]}>
          <View style={[s.jcsb, s.flx_row, s.mh3, s.bg_white, s.ph2, s.pv3]}>
            <Input
              style={([s.h2, s.tac, s.f5], { textAlign: 'center', width: '100%' })}
              placeholder="password"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.auth.password}
            />
          </View>
        </View>

        <Text style={styles.errorTextStyle}>{this.props.auth.error}</Text>

        {this.renderButton()}
      </View>
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

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = {
  emailChanged,
  passwordChanged,
  loginUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
