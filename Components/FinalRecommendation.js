import React, { Component } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Spinner } from "native-base";

export class FinalRecommendation extends Component {
  static navigationOptions = props => {
    return {
      header: null
    };
  };
  state = {
    restaurant: null
  };

  render() {
    this.props.socket.socket.on("give_result", data => {
      this.setState({ restaurant: data });
    });
    console.log(this.state.restaurant);
    if (!this.state.restaurant)
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
    else
      return (
        <View style={{ marginTop: 50 }}>
          <Image
            style={{
              height: Dimensions.get("window").height * 0.53,
              marginTop: 50,
              marginRight: 10,
              marginLeft: 10
            }}
            resizeMode="contain"
            source={{ uri: this.state.restaurant.image }}
          ></Image>
          <Text style={{ fontSize: 40, alignSelf: "center", marginTop: 20 }}>
            {this.state.restaurant.name}{" "}
          </Text>
        </View>
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
)(FinalRecommendation);
