import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import Colors from '../constants/Colors';
import { styles as s } from 'react-native-style-tachyons';
import { Button, Icon } from 'react-native-elements';
import { deleteDecision } from '../redux/decisions/Api';

class DecisionBubble extends React.Component {
  state = {
    open: false
  };
  chooseColor = score => {
    if (score > 0.66) {
      return Colors.goodDecision;
    } else if (score < 0.33) {
      return Colors.badDecision;
    }
    return Colors.okayDecision;
  };

  formatDate = date => {
    const newDate = new Date(date);
    return `${newDate.getMonth()}/${newDate.getDate()}/${newDate.getFullYear()}`;
  };

  render() {
    const { score, text, date } = this.props;
    const styles = StyleSheet.create({
      gridItem: {
        margin: 5,
        width: Dimensions.get('window').width / 2.2, //Device width divided in almost a half,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center'
      },
      gridItemImage: {
        width: 100,
        height: 100,
        borderWidth: 1.5,
        borderColor: 'black',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: this.chooseColor(score)
      },
      gridItemText: {
        marginTop: 5,
        textAlign: 'center'
      }
    });

    return (
      <View>
        <TouchableOpacity style={styles.gridItem} onPress={() => this.setState({ open: !this.state.open })}>
          <View style={styles.gridItemImage}>
            <Text style={{ fontSize: 25 }}>{Math.round(score * 100)}%</Text>
          </View>
          <Text style={styles.gridItemText}>
            {text && text.length > 15 ? `${text.slice(0, 15)}...` : text || ''}
          </Text>
        </TouchableOpacity>
        {this.state.open && (
          <Modal animationType="slide" transparent visible={this.state.modalVisible}>
            <View style={[s.aic, s.jcc]}>
              <View
                style={[
                  s.mt5,
                  s.pv2,
                  s.ph4,
                  {
                    backgroundColor: 'white',
                    borderRadius: 15,
                    width: '90%',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 2
                  }
                ]}>
                <View style={[s.pa2]}>
                  <View style={[s.pv3]}>
                    <View style={[s.flx_row, s.jcsb]}>
                      <View style={[s.max_w5]}>
                        <Text style={[s.f5]}>{this.formatDate(date)}</Text>
                        <Text style={[s.f3]}>{text}</Text>
                      </View>
                    </View>
                    <View style={[s.mt3, s.pa1]}>
                      <View style={[s.flx_row, s.jcsb]}>
                        <View>
                          {Object.keys(this.props.rows).map((key, i) => (
                            <Text key={i} style={[s.f4, s.max_w5]}>
                              {key.length > 18 ? `${key.slice(0, 16)}...` : key}
                            </Text>
                          ))}
                        </View>
                        <View>
                          {Object.keys(this.props.rows).map((key, i) => (
                            <Text key={i} style={[s.f4, s.max_w5]}>
                              {`${Math.round(this.props.rows[key] * 100)}%`}
                            </Text>
                          ))}
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={[s.flx_row]}>
                    <Button
                      title="Close"
                      onPress={() => {
                        this.setState({ open: !this.state.open });
                      }}
                      buttonStyle={[s.br5, { backgroundColor: Colors.darkestBlue, minWidth: '100%' }]}
                    />
                    <Icon
                      name="delete"
                      type="material"
                      onPress={() => {
                        deleteDecision(this.props.id);
                        this.setState({ open: !this.state.open });
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({ priorities }) => ({ priorities });

const mapDispatchToProps = {
  deleteDecision
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DecisionBubble);
