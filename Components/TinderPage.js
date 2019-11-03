import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TinderCards from "./TinderCards";
export class TinderPage extends Component {
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
    return <TinderCards restaurants={this.state.restaurants} />;
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
