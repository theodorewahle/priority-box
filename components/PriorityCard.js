import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { CardSection, Card } from './common';
import { Button } from 'react-native-elements';
import { styles as s } from 'react-native-style-tachyons';

export default class PriorityCard extends React.Component {
  state = {
    open: false
  };

  deletePriority = () => {};
  render() {
    return (
      <Card style={[s.br4]}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({ open: !this.state.open });
          }}>
          <View>
            <CardSection>
              <View>
                <Text style={[s.f3, s.black, s.pr2]}>{this.props.priority.text}</Text>
              </View>
            </CardSection>
            {this.state.open && (
              <View style={[s.aic]}>
                <Button title="delete" buttonStyle={{ color: 'red', borderRadius: 5 }} />
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </Card>
    );
  }
}
