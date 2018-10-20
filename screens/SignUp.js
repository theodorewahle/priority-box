import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import { DangerZone } from "expo";
import { Button } from "react-native-elements";
import { styles as s } from "react-native-style-tachyons";
import { signUpUser } from "../redux/auth/Api";
import { emailChanged, passwordChanged } from "../redux/auth/Actions";
import logo from "../assets/images/icon.png";
import Colors from "../constants/Colors";
import loading from "../assets/animations/loading.json";

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
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Button
          text="Sign Up"
          title="Sign Up"
          buttonStyle={{
            borderRadius: 10,
            width: "100%",
            backgroundColor: Colors.mediumBlue
          }}
          onPress={this.onButtonPress.bind(this)}
        >
          Sign Up
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
          width: "100%",
          height: 150
        }}
        source={this.state.animation}
        loop
        speed={1.5}
      />
    );
    await this.setState({ button: loader });
    this.playAnimation();
    await this.props.signUpUser(
      this.props.auth.email,
      this.props.auth.password
    );
    if (this.props.auth.user != null) {
      this.props.navigation.navigate("App");
    } else {
      const button = (
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Button
            text="Sign Up"
            title="Sign Up"
            buttonStyle={{
              borderRadius: 10,
              width: "100%",
              backgroundColor: Colors.mediumBlue
            }}
            onPress={this.onButtonPress.bind(this)}
          >
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
      <View
        style={[{ backgroundColor: "white", height: "100%" }, s.aic, s.jcsb]}
      >
        <View>
          <Image style={[s.max_w5, s.max_h5]} source={logo} />
        </View>
        <KeyboardAvoidingView behavior="padding" enabled>
          <View style={styles.shadowStyle}>
            <View
              style={[
                s.jcsb,
                s.flx_row,
                s.mh3,
                s.bg_white,
                s.ph3,
                s.pv3,
                s.mb1
              ]}
            >
              <TextInput
                style={
                  ([s.h2, s.tac, s.f5], { textAlign: "center", width: "100%" })
                }
                label="Email"
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="email"
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.auth.email}
              />
            </View>
          </View>
          <View style={[styles.shadowStyle, s.mb1]}>
            <View style={[s.jcsb, s.flx_row, s.mh3, s.bg_white, s.ph2, s.pv3]}>
              <TextInput
                style={
                  ([s.h2, s.tac, s.f5], { textAlign: "center", width: "100%" })
                }
                placeholder="password"
                underlineColorAndroid="rgba(0,0,0,0)"
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.auth.password}
              />
            </View>
          </View>
          <Text style={styles.errorTextStyle}>{this.props.auth.error}</Text>
          <View style={[s.aic, s.mb5]}>{this.state.button}</View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  },
  shadowStyle: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderRadius: 3,
    width: "100%"
  }
};

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = {
  emailChanged,
  passwordChanged,
  signUpUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
