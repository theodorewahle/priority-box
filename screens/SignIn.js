import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet
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
        <View style={[s.mt4, s.mb2]}>
          <Image style={{ height: '50%', width: '50%' }} source={logo} />
        </View>
        <KeyboardAvoidingView behavior="padding" style={styles.form}>
          <View style={styles.cardStyle}>
            <View
              style={[
                s.jcsb,
                s.flx_row,
                s.mh3,
                s.ph2,
                s.pv1,
                s.mb2,
                {
                  marginLeft: Platform.OS === 'android' ? 20 : 0,
                  marginRight: Platform.OS === 'android' ? 20 : 0,
                  backgroundColor: Platform.OS === 'ios' ? 'white' : null
                }
              ]}>
              <TextInput
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
              <TextInput
                style={[
                  s.jcsb,
                  s.flx_row,
                  s.mh3,
                  s.ph2,
                  s.pv1,
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

const styles = StyleSheet.create({
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
    width: '100%'
  },
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1'
  },
  header: {
    paddingTop: 20,
    padding: 20,
    backgroundColor: '#336699'
  },
  description: {
    fontSize: 14,
    color: 'white'
  },
  input: {
    margin: 20,
    marginBottom: 0,
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16
  },
  legal: {
    margin: 10,
    color: '#333',
    fontSize: 12,
    textAlign: 'center'
  }
});

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

/*

*/
