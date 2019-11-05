import React, { Component } from "react";
import { ImageBackground, StyleSheet, View, Dimensions } from "react-native";
import {
  Container,
  Header,
  DeckSwiper,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Icon
} from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
class TinderCards extends Component {
  state = {
    liked: [],
    disliked: []
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
              this.setState({ disliked: newDisliked });
              console.log(this.state.disliked);
            }}
            onSwipeRight={e => {
              let newLiked = this.state.liked;
              newLiked.push(e.id);
              this.setState({ liked: newLiked });
              console.log(this.state.liked);
            }}
            looping={false}
            dataSource={cards}
            renderItem={item => (
              <Card style={{ elevation: 3, borderRadius: 20 }}>
                {/* <CardItem>
                  <Left>
                    <Thumbnail
                      source={{ uri: item.image }}
                      resizeMode="contain"
                    />
                    <Body>
                      <Text>{item.name}</Text>
                    
                    </Body>
                  </Left>
                </CardItem> */}
                <CardItem cardBody style={{ borderRadius: 20 }}>
                  {/* <Image
                    style={{ height: 600, flex: 1 }}
                    resizeMode="contain"
                    source={{ uri: item.image }}
                  >
                    <View
                      style={{
                        backgroundColor: "rgba(0,0,0,.6)",
                        height: 600
                      }}
                    >
                      <Text> Test Text </Text>
                    </View>
                  </Image> */}
                  <ImageBackground
                    style={{
                      height: Dimensions.get("window").height * 0.72,
                      flex: 1,
                      borderRadius: 20
                    }}
                    resizeMode="contain"
                    source={{ uri: item.image }}
                  >
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
                        height: Dimensions.get("window").height * 0.7,
                        borderRadius: 20
                      }}
                    ></LinearGradient>
                    {/* <View
                      style={{
                        height: 600,
                        backgroundColor: "black",
                        opacity: 0.35,
                        borderRadius: 20
                      }}
                    ></View> */}
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

const mapDispatchToProps = {};

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TinderCards)
);
