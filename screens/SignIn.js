import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput as Input,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { loginUser } from '../redux/auth/Api';
import { emailChanged, passwordChanged } from '../redux/auth/Actions';

import { Button } from 'react-native-elements';
import { styles as s } from 'react-native-style-tachyons';
import logo from '../assets/images/icon.png';
import Colors from '../constants/Colors';
import { DangerZone } from 'expo';
import loading from '../assets/animations/loading.json';

const { Lottie } = DangerZone;

class SignIn extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    animation: null,
    button: null,
    loader: null
  };

  componentWillMount() {
    this._loadAnimation();
    const button = (
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <Button
          text="Log In"
          title="Log In"
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

    this.setState({ button });
  }

  onButtonPress = async () => {
    const loader = (
      <Lottie
        ref={animation => {
          this.animation = animation;
        }}
        style={{
          width: '100%',
          height: 150
        }}
        source={this.state.animation}
        loop
        speed={1.5}
      />
    );
    await this.setState({ button: loader });
    this.playAnimation();
    await this.props.loginUser(this.props.auth.email, this.props.auth.password);
    if (this.props.auth.user != null) {
      this.props.navigation.navigate('App');
    } else {
      const button = (
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <Button
            text="Log In"
            title="Log In"
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

      this.setState({ button });
    }
  };

  onEmailChange(text) {
    this.props.emailChanged(text.toLowerCase());
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  _loadAnimation = () => {
    this.setState({ animation: loading });
  };

  playAnimation = async () => {
    if (!this.state.animation) {
      this._loadAnimation();
    } else if (this.animation) {
      await this.animation.play();
    }
  };

  render() {
    return (
      <View style={[{ backgroundColor: 'white', height: '100%' }, s.aic]}>
        <View>
          <Image style={[s.max_w5, s.max_h5]} source={logo} />
        </View>
        <KeyboardAvoidingView behavior="padding" enabled>
          <View style={styles.cardStyle}>
            <View
              style={[
                s.jcsb,
                s.flx_row,
                s.mh3,
                s.ph2,
                s.pv3,
                s.mb2,
                {
                  marginLeft: Platform.OS === 'android' ? 20 : 0,
                  marginRight: Platform.OS === 'android' ? 20 : 0,
                  backgroundColor: Platform.OS === 'ios' ? 'white' : null
                }
              ]}>
              <Input
                style={[s.jcsb, s.flx_row, s.mh3, s.ph2, s.pv2, { width: '80%' }]}
                label="Email"
                placeholder="email"
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.auth.email}
              />
            </View>
          </View>
          <View style={styles.cardStyle}>
            <View
              style={[
                s.jcsb,
                s.flx_row,
                s.mh3,
                s.ph2,
                s.pv3,
                s.mb1,
                {
                  marginLeft: Platform.OS === 'android' ? 20 : 0,
                  marginRight: Platform.OS === 'android' ? 20 : 0,
                  backgroundColor: Platform.OS === 'ios' ? 'white' : null
                }
              ]}>
              <Input
                style={[
                  s.jcsb,
                  s.flx_row,
                  s.mh3,
                  s.ph2,
                  s.pv2,
                  {
                    width: '80%'
                  }
                ]}
                placeholder="password"
                autoCorrect={false}
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.auth.password}
              />
            </View>
          </View>
          <Text style={styles.errorTextStyle}>{this.props.auth.error}</Text>
          <View style={[s.aic]}>{this.state.button}</View>
        </KeyboardAvoidingView>
        <View style={[s.flx_row, s.mt5, s.mb3]}>
          <Text style={[s.blue, s.f6]}>Are you new here? </Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={([s.blue, s.f6], { color: 'blue' })}>Create an account ></Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  cardStyle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderRadius: 3,
    elevation: 0.1,
    width: '100%'
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
)(SignIn);
