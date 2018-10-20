import React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";
import { Header, Icon } from "react-native-elements";
import { getPriorities } from "../redux/priorities/Api";
import { logoutUser } from "../redux/auth/Api";

import PriorityCard from "../components/PriorityCard";
import { styles as s } from "react-native-style-tachyons";
import { orderPriorities } from "../utils";
import Colors from "../constants/Colors";

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Home",
      header: (
        <Header
          outerContainerStyles={{
            height: 80,
            borderBottomWidth: 0,
            justifyContent: "space-between"
          }}
          rightComponent={
            <Icon
              name="edit"
              type="material"
              onPress={() => navigation.navigate("PriorityForm")}
            />
          }
          centerComponent={{ text: "Priorities", style: [s.white, s.f5] }}
          backgroundColor={Colors.mediumBlue}
        />
      )
    };
  };

  async componentDidMount() {
    await this.props.getPriorities();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          {orderPriorities(this.props.priorities).map(priority => (
            <PriorityCard
              key={priority.rank}
              priority={priority}
              priorityNumber={Object.keys(this.props.priorities).length}
            />
          ))}
          {Object.keys(this.props.priorities).length < 1 && (
            <View style={[s.aic, s.mt3]}>
              <Text style={[s.f3]}>Write out your priorities.</Text>
              <Text style={[s.f6]}>(They can be BIG goals or small ones!)</Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    paddingTop: 10
  },
  cardSectionHeaderStyle: {
    borderRadius: 6,
    backgroundColor: "white",
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderColor: "black",
    maxHeight: 20
  }
});

const mapStateToProps = ({ priorities, auth }) => ({ priorities, auth });

const mapDispatchToProps = {
  getPriorities,
  logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
