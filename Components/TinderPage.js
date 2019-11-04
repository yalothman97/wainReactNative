import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TinderCards from "./TinderCards";
import TinderTest from "./TinderTest";
import { Spinner } from "native-base";
export class TinderPage extends Component {
  static navigationOptions = props => {
    return {
      header: null
    };
  };
  state = {
    restaurants: []
  };
  render() {
    let rests;
    this.props.socket.socket.on("filtered_rest", data => {
      //   console.log(data);
      this.setState({ restaurants: data.filterList });
    });
    if (this.state.restaurants.length)
      rests = this.state.restaurants.map(rest => {
        // console.log("inside this nigga");
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

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TinderPage);
