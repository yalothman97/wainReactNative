import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class Waiting extends Component {
  state = {
    participants: 0,
    submitted: 0
  };
  render() {
    this.props.socket.socket.on("participantsSubmitted", data => {
      this.setState({ submitted: data.participants });
    });
    this.props.socket.socket.on("participantsChanged", data => {
      this.setState({ participants: data.participants });
    });

    return (
      <View>
        <Text>
          Number of participants in the room: {this.state.participants}
        </Text>
        <Text>
          Number of participants who submitted: {this.state.submitted}
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
)(Waiting);
