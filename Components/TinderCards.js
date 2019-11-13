import React, { Component } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Dimensions,
  Image
} from "react-native";
import {
  Container,
  DeckSwiper,
  Card,
  CardItem,
  Text,
  Button
} from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";

class TinderCards extends Component {
  state = {
    liked: [],
    disliked: [],
    showInstructions: true
  };

  render() {
    const cards = this.props.restaurants;
    if (cards.length == this.state.liked.length + this.state.disliked.length) {
      this.props.socket.socket.emit("tinder_submit", {
        id: this.props.socket.roomName,
        liked: this.state.liked,
        name: this.props.socket.nickname
      });
      this.props.navigation.replace("TinderWaitingScreen");
    }

    if (!cards || !cards.length) return <Text>Loading</Text>;
    return (
      <Container style={{ marginLeft: 10, marginRight: 10, borderRadius: 20 }}>
        <View style={{ borderRadius: 20 }}>
          <DeckSwiper
            onSwipeLeft={e => {
              let newDisliked = this.state.disliked;
              newDisliked.push(e.id);
              this.setState({ disliked: newDisliked, showInstructions: false });
            }}
            onSwipeRight={e => {
              let newLiked = this.state.liked;
              newLiked.push(e.id);
              this.setState({ liked: newLiked, showInstructions: false });
            }}
            looping={false}
            dataSource={cards}
            renderItem={item => (
              <Card style={{ elevation: 3, borderRadius: 20 }}>
                <CardItem cardBody style={{ borderRadius: 20 }}>
                  <ImageBackground
                    style={{
                      height: Dimensions.get("window").height * 0.72,
                      flex: 1,
                      borderRadius: 20
                    }}
                    resizeMode="contain"
                    source={{ uri: item.image }}
                  >
                    {this.state.showInstructions ? (
                      <LinearGradient
                        colors={["rgba(0, 0, 0,0.4)", "rgba(0, 0, 0,0.5)"]}
                        style={{
                          height: Dimensions.get("window").height * 0.72,
                          borderRadius: 20,
                          zIndex: 5
                        }}
                      ></LinearGradient>
                    ) : (
                      <LinearGradient
                        colors={[
                          "rgba(0, 0, 0,0)",
                          "rgba(0, 0, 0,0)",
                          "rgba(0, 0, 0,0)",
                          "rgba(0, 0, 0,0)",
                          "rgba(0, 0, 0,0)",
                          "rgba(0, 0, 0,0)",
                          "rgba(0, 0, 0,0)",
                          "rgba(0, 0, 0,0)",
                          "rgba(0, 0, 0,0)",
                          "rgba(0, 0, 0,0)",
                          "rgba(0, 0, 0,0)",
                          "rgba(0, 0, 0,0)",
                          "rgba(0, 0, 0,0.1)",
                          "rgba(0, 0, 0,0.3)",
                          "rgba(0, 0, 0,0.4)",
                          "rgba(0, 0, 0,0.5)"
                        ]}
                        style={{
                          height: Dimensions.get("window").height * 0.72,
                          borderRadius: 20
                        }}
                      ></LinearGradient>
                    )}
                    {this.state.showInstructions ? (
                      <>
                        <Image
                          source={require("../assets/right.png")}
                          resizeMode="contain"
                          style={{
                            width: 140,
                            height: 140,
                            zIndex: 54654,
                            position: "absolute",
                            top: 50,
                            alignSelf: "center"
                          }}
                        ></Image>
                        <Image
                          source={require("../assets/left.png")}
                          resizeMode="contain"
                          style={{
                            width: 140,
                            height: 140,
                            zIndex: 54654,
                            position: "absolute",
                            top: 250,
                            alignSelf: "center"
                          }}
                        ></Image>
                        <Button
                          style={{
                            alignSelf: "center",
                            position: "absolute",
                            top: 450,
                            zIndex: 6
                          }}
                          onPress={() =>
                            this.setState({ showInstructions: false })
                          }
                        >
                          <Text>Got it</Text>
                        </Button>
                      </>
                    ) : null}

                    <Text
                      style={{
                        position: "absolute",
                        bottom: 60,
                        left: 5,
                        fontSize: 35,
                        color: "white"
                      }}
                    >
                      {item.name}
                    </Text>
                  </ImageBackground>
                </CardItem>
              </Card>
            )}
          />
        </View>
      </Container>
    );
  }
}
const s = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "red",
    opacity: 0.3
  }
});

const mapStateToProps = state => ({
  socket: state.socket
});

export default withNavigation(
  connect(
    mapStateToProps,
    null
  )(TinderCards)
);
