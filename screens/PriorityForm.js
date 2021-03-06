import React from "react";
import {
  View,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { Header, Icon } from "react-native-elements";
import { styles as s } from "react-native-style-tachyons";
import { DangerZone } from "expo";
import Colors from "../constants/Colors";
import { postPriority } from "../redux/priorities/Api";
import submitButton from "../assets/animations/submit_button.json";

const { Lottie } = DangerZone;

class PriorityForm extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Home",
    header: (
      <Header
        outerContainerStyles={{
          height: 80,
          borderBottomWidth: 0,
          justifyContent: "space-between"
        }}
        leftComponent={
          <Icon
            name="chevron-left"
            type="material"
            onPress={() => navigation.navigate("Home")}
          />
        }
        centerComponent={{ text: "New Priority", style: [s.white, s.f5] }}
        backgroundColor={Colors.mediumBlue}
      />
    )
  });

  state = {
    text: "",
    animation: null,
    tapped: -500
  };

  componentWillMount() {
    this._loadAnimation();
  }

  onButtonPress = async () => {
    this.playAnimation();
    this.setState({ tapped: this.state.tapped + 500 });

    const priorityObject = {
      text: this.state.text,
      rank: Object.keys(this.props.priorities).length + 1
    };
    if (priorityObject.text.length > 0 && this.state.tapped < -1) {
      await this.props.postPriority(priorityObject);
    }
    setTimeout(() => {
      this.props.navigation.navigate("Home");
      this.setState({ tapped: -500 });
    }, 2800);
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
      <View style={([s.mh1, s.br4], { backgroundColor: "white", flex: 1 })}>
        <View style={[s.aic, s.mt3, { width: "100%" }]}>
          <Text style={[s.f5, s.mh3]}>{"What's your priority?"}</Text>
          <View style={[s.br5, s.pa3, s.mb2, { width: "100%" }]}>
            <TextInput
              style={[s.f3, s.pa2, { width: "100%", textAlign: "center" }]}
              maxLength={40}
              multiline
              underlineColorAndroid="rgba(0,0,0,0)"
              onChangeText={text => this.setState({ text })}
              placeholder={`${'"Run a marathon"'}`}
            />
          </View>
        </View>
        <View style={[s.aic, Platform.OS === "ios" ? s.pr4 : s.pr3]}>
          <TouchableWithoutFeedback
            style={[s.aic]}
            onPress={this.onButtonPress}
          >
            {this.state.animation && (
              <Lottie
                ref={animation => {
                  this.animation = animation;
                }}
                style={{
                  width: 300,
                  height: 300
                }}
                source={this.state.animation}
                loop={false}
                speed={1.5}
              />
            )}
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }

  _loadAnimation = () => {
    this.setState({ animation: submitButton });
  };
}

const mapStateToProps = ({ priorities }) => ({ priorities });

const mapDispatchToProps = {
  postPriority
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PriorityForm);
