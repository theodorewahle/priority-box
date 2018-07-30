import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Header, Icon, FormLabel, FormInput } from 'react-native-elements';
import { styles as s } from 'react-native-style-tachyons';
import { postPriority } from '../redux/priorities/Api';
import submit_button from '../assets/animations/submit_button.json';
import { DangerZone } from 'expo';

const { Lottie } = DangerZone;

class PriorityForm extends React.Component {
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
        backgroundColor="green"
      />
    )
  });

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
      <View style={[s.mh1, s.br4]}>
        <FormLabel>Priority</FormLabel>
        <FormInput
          maxLength={40}
          multiline
          onChangeText={text => this.setState({ text })}
          placeholder={`${'"Run a marathon"'}`}
        />
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
    this.setState({ animation: submit_button });
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
