import React, { Component } from "react";
import { ScrollView, ListView, StyleSheet, Modal } from "react-native";
import { connect } from "react-redux";
import { Header, Button } from "react-native-elements";
import { styles as s } from "react-native-style-tachyons";

import { getDecisions } from "../redux/decisions/Api";
import DecisionFormCard from "../components/DecisionFormCard";
import DecisionBubble from "../components/DecisionBubble";
import Colors from "../constants/Colors";

import { orderDecisions } from "../utils";

class Decisions extends Component {
  static navigationOptions = () => {
    return {
      title: "Home",
      header: (
        <Header
          outerContainerStyles={{
            height: 80,
            borderBottomWidth: 0,
            justifyContent: "space-between"
          }}
          centerComponent={{ text: "Decisions", style: [s.white, s.f5] }}
          backgroundColor={Colors.mediumBlue}
        />
      )
    };
  };

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      ds,
      composing: false
    };
  }

  async componentWillMount() {
    await this.props.getDecisions();
  }

  getDataSource = () => {
    if (!this.props.decisions) {
      return this.state.ds.cloneWithRows(["dataSource"]);
    }
    const dataSource = orderDecisions(this.props.decisions);
    return this.state.ds.cloneWithRows(dataSource);
  };

  render() {
    return (
      <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
        <Button
          title="Make New Decision"
          buttonStyle={{
            borderRadius: 10,
            marginTop: 20,
            backgroundColor: Colors.darkestBlue
          }}
          onPress={() => this.setState({ composing: true })}
        />
        <ListView
          enableEmptySections
          contentContainerStyle={styles.grid}
          dataSource={this.getDataSource()}
          renderRow={({ key, decision }) => (
            <DecisionBubble
              id={key}
              score={decision.score}
              text={decision.name}
              date={decision.date}
              rows={decision.subScores}
            />
          )}
        />
        <Modal animationType="slide" transparent visible={this.state.composing}>
          <DecisionFormCard
            onClose={() => this.setState({ composing: false })}
          />
        </Modal>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ decisions }) => ({ decisions });

const mapDispatchToProps = {
  getDecisions
};
const styles = StyleSheet.create({
  grid: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Decisions);
