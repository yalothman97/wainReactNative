//#f13939
import React, { Component } from "react";
import { Container, Content, Text, Toast, Root, View } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { connect } from "react-redux";
import { TextInput } from "react-native-gesture-handler";
import { createRoom, joinRoom, setNickname } from "../redux/actions";
import { Input } from "react-native-elements";
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
    }

    return (
      <Container
        style={{
          // vertical
          //veru nic #c92c2c
          alignItems: "center",
          // horizontal
          alignSelf: "center",
          backgroundColor: "#ffffff",
          width: Dimensions.get("window").width
        }}
      >
        <Text
          style={{
            fontWeight: "800",
            color: "#BC0000",
            marginTop: 100,
            fontSize: 25
          }}
        >
          Not sure where to eat?
        </Text>

        <Content>
          <View
            style={{
              height: Dimensions.get("window").height - 100
            }}
          >
            <Input
              containerStyle={{
                height: 40,

                width: Dimensions.get("window").width - 35,
                paddingLeft: 10,
                paddingRight: 10,
                alignSelf: "center",
                marginBottom: 50,
                marginTop: 50
              }}
              inputStyle={{ color: "#BC0000" }}
              placeholder="Enter your nickname"
              onChangeText={text => this.setState({ nickname: text })}
            />
            <Input
              containerStyle={{
                height: 40,

                width: Dimensions.get("window").width - 35,
                paddingLeft: 10,
                paddingRight: 10,
                alignSelf: "center",
                marginBottom: 20
              }}
              autoCapitalize="characters"
              inputStyle={{ color: "#BC0000" }}
              placeholder="Enter room name"
              onChangeText={text => this.setState({ roomName: text })}
            />
            <Root>
              <TouchableOpacity
                style={
                  !this.state.roomName || !this.state.nickname
                    ? styles.circleDisabled
                    : styles.circle
                }
                onPress={() => {
                  if (!this.state.roomName || !this.state.nickname)
                    Toast.show({
                      text: "Make sure to enter your nickname and room name",
                      buttonText: "Okay",
                      type: "warning",
                      style: {
                        position: "absolute",
                        bottom: 0,
                        zIndex: 55
                      }
                    });
                  else {
                    this.props.joinRoom(
                      this.state.roomName,
                      this.state.nickname
                    );
                    this.props.setNickname(this.state.nickname);

                    this.props.navigation.replace("Question1Screen");
                  }
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
                  Wain?
                </Text>
              </TouchableOpacity>
            </Root>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    width: 200,
    height: 200,
    borderRadius: 250 / 2,
    backgroundColor: "#BC0000",
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 50
  },
  circleDisabled: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    backgroundColor: "#BC0000",
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 50
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
  tags: state.tagsReducer.tags,
  socket: state.socket
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
