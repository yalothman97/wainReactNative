import React, { Component } from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import TinderCards from "./TinderCards";
import { Spinner } from "native-base";

export class TinderPage extends Component {
  static navigationOptions = () => {
    return {
      header: null
    };
  };

  state = {
    restaurants: []
  };

  render() {
    let rests;
    this.props.socket.socket.on("moveToResult", () => {
      this.props.navigation.replace("FinalScreen");
    });
    this.props.socket.socket.on("filtered_rest", data => {
      this.setState({ restaurants: data.filterList });
    });
    if (this.state.restaurants.length)
      rests = this.state.restaurants.map(rest => {
        return <Text>{rest.name}</Text>;
      });
    else
      return (
        <Spinner
          color="red"
          style={{
            width: "30%",
            height: "30%",
            marginTop: "auto",
            marginBottom: "auto",
            alignSelf: "center"
          }}
        />
      );
    return (
      <>
        <Text
          style={{
            marginTop: 75,
            alignSelf: "center",
            fontSize: 30,

            color: "#c92020"
          }}
        >
          Almost there!
        </Text>
        <Text
          style={{
            marginTop: 10,
            alignSelf: "center",
            fontSize: 14,
            marginBottom: 20,
            color: "#c92020"
          }}
        >
          Swipe right if you like the restaurant, and left if you don't
        </Text>
        <TinderCards restaurants={this.state.restaurants} />
      </>
    );
  }
}

const mapStateToProps = state => ({
  socket: state.socket
});

export default connect(
  mapStateToProps,
  null
)(TinderPage);
