import React, { Component } from "react";
import { Image } from "react-native";
import {
  Container,
  Header,
  View,
  DeckSwiper,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Icon
} from "native-base";
// const cards = [
//   {
//     text: "Card One",
//     name: "One",
//     image: require("../assets/icon.png")
//   }
// ];
export default class TinderCards extends Component {
  render() {
    const cards = this.props.restaurants;
    console.log(cards);
    if (!cards || !cards.length) return <Text>Loading</Text>;
    return (
      <Container>
        <View>
          <DeckSwiper
            looping={false}
            dataSource={cards}
            renderItem={item => (
              <Card style={{ elevation: 3 }}>
                <CardItem>
                  <Left>
                    <Thumbnail source={item.image} />
                    <Body>
                      <Text>{item.name}</Text>
                      {/* <Text note>NativeBase</Text> */}
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image style={{ height: 300, flex: 1 }} source={item.image} />
                </CardItem>
                <CardItem>
                  <Icon name="heart" style={{ color: "#ED4A6A" }} />
                  <Text>{item.name}</Text>
                </CardItem>
              </Card>
            )}
          />
        </View>
      </Container>
    );
  }
}
