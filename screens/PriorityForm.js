import React from 'react';
import { View, TouchableWithoutFeedback, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Header, Icon } from 'react-native-elements';
import { styles as s } from 'react-native-style-tachyons';
import Colors from '../constants/Colors';
import { postPriority } from '../redux/priorities/Api';
import submitButton from '../assets/animations/submit_button.json';
import { DangerZone } from 'expo';

const { Lottie } = DangerZone;

class PriorityForm extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    header: (
      <Header
        outerContainerStyles={{
          height: 80,
          borderBottomWidth: 0,
          justifyContent: 'space-between'
        }}
        leftComponent={
          <Icon name="chevron-left" type="material" onPress={() => navigation.navigate('Home')} />
        }
        centerComponent={{ text: 'New Priority', style: [s.white, s.f5] }}
        backgroundColor={Colors.mediumBlue}
      />
    )
  });

  state = {
    text: '',
    animation: null
  };

  componentWillMount() {
    this._loadAnimation();
  }

  playAnimation = async () => {
    if (!this.state.animation) {
      this._loadAnimation();
    } else if (this.animation) {
      await this.animation.play();
    }
  };

  onButtonPress = async () => {
    this.playAnimation();

    const priorityObject = {
      text: this.state.text,
      rank: Object.keys(this.props.priorities).length + 1
    };
    if (priorityObject.text.length > 0) {
      await this.props.postPriority(priorityObject);
    }
    setTimeout(() => this.props.navigation.navigate('Home'), 2800);
  };

  render() {
    return (
      <View style={([s.mh1, s.br4], { backgroundColor: 'white', flex: 1 })}>
        <View style={[s.aic, s.mt3]}>
          <Text style={[s.f5, s.mh3]}>{"What's your priority?"}</Text>
          <View style={[s.br5, s.pa3, s.mb2]}>
            <TextInput
              style={[s.f3]}
              maxLength={40}
              multiline
              onChangeText={text => this.setState({ text })}
              placeholder={`${'"Run a marathon"'}`}
            />
          </View>
        </View>
        <View style={[s.aic, s.pr4]}>
          <TouchableWithoutFeedback onPress={this.onButtonPress}>
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
