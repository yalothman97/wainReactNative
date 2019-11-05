import React, { Component } from "react";
import { Container, Header, Content, View, Button, Text } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { connect } from "react-redux";
import { TextInput } from "react-native-gesture-handler";
import { createRoom, joinRoom, setNickname } from "../redux/actions";
class Home extends Component {
  static navigationOptions = props => {
    return {
      header: null
    };
  };
  state = {
    roomName: null,
    nickname: ""
  };
  render() {
    if (!this.props.loading && !this.props.tagsLoading) {
      // console.log("restaurants", this.props.restaurants);
      // console.log("tags", this.props.tags);
    }
    return (
      <Container>
        <Grid>
          <Row
            style={{
              // vertical
              alignItems: "center",
              // horizontal
              alignSelf: "center"
            }}
            size={20}
          >
            <Text
              style={{
                fontWeight: "800",
                color: "#BC0000"
              }}
            >
              Not sure where to eat?
            </Text>
          </Row>
          <Row size={80}>
            <Content>
              <TextInput
                style={{
                  height: 40,
                  borderColor: "gray",
                  borderWidth: 1,
                  borderRadius: 10,
                  width: Dimensions.get("window").width - 20,
                  paddingLeft: 10,
                  paddingRight: 10,
                  alignSelf: "center",
                  marginBottom: 20
                }}
                placeholder="Enter your nickname"
                onChangeText={text => this.setState({ nickname: text })}
              />
              <TextInput
                style={{
                  height: 40,
                  borderColor: "gray",
                  borderWidth: 1,
                  borderRadius: 10,
                  width: Dimensions.get("window").width - 20,
                  paddingLeft: 10,
                  paddingRight: 10,
                  alignSelf: "center",
                  marginBottom: 20
                }}
                placeholder="Enter room name"
                onChangeText={text => this.setState({ roomName: text })}
              />

              <TouchableOpacity
                disabled={!this.state.roomName && true}
                style={
                  !this.state.roomName ? styles.circleDisabled : styles.circle
                }
                onPress={() => {
                  this.props.joinRoom(this.state.roomName, this.state.nickname);
                  this.props.setNickname(this.state.nickname);
                  this.props.navigation.replace("Question1Screen");
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    flexDirection: "column",

                    fontWeight: "800",
                    color: "white",
                    fontSize: 50
                  }}
                >
                  Create
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={!this.state.roomName && true}
                style={
                  !this.state.roomName
                    ? styles.joinCircleDisabled
                    : styles.joinCircle
                }
                onPress={() => {
                  this.props.joinRoom(this.state.roomName, this.state.nickname);
                  this.props.setNickname(this.state.nickname);
                  this.props.navigation.replace("Question1Screen");
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    flexDirection: "column",

                    fontWeight: "800",
                    color: "white",
                    fontSize: 50
                  }}
                >
                  Join
                </Text>
              </TouchableOpacity>
            </Content>
          </Row>
        </Grid>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    backgroundColor: "#c92020",
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 20
  },
  circleDisabled: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    backgroundColor: "#a8a396",
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 20
  },
  joinCircle: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    backgroundColor: "#096931",
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 20
  },
  joinCircleDisabled: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    backgroundColor: "#a8a396",
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 20
  }
});

const mapStateToProps = state => ({
  restaurants: state.restaurantsReducer.restaurants,
  loading: state.restaurantsReducer.loading,
  tagsLoading: state.tagsReducer.loading,
  tags: state.tagsReducer.tags
});
const mapDispatchToProps = dispatch => {
  return {
    createRoom: (roomName, nickname) =>
      dispatch(createRoom(roomName, nickname)),
    joinRoom: (roomName, nickname) => dispatch(joinRoom(roomName, nickname)),
    setNickname: nickname => dispatch(setNickname(nickname))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
