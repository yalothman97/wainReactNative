import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { connect } from "react-redux";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  Container,
  Spinner,
  Card,
  CardItem,
  Body,
  Text,
  Right,
  Left,
  Button
} from "native-base";
import { Icon } from "react-native-elements";

export class Waiting extends Component {
  static navigationOptions = () => {
    return {
      header: null
    };
  };

  state = {
    participants: [],
    showContinueButton: false
  };

  render() {
    this.props.socket.socket.on("participantsChanged", data => {
      this.setState({ participants: data.participants });
    });

    this.props.socket.socket.on("moveToResult", () => {
      if (!this.props.socket.admin)
        this.props.navigation.replace("FinalScreen");
    });

    const checkingIfDone = this.state.participants.filter(
      par => par.tinderSubmitted == false
    );

    if (
      checkingIfDone.length == 0 &&
      this.state.showContinueButton == false &&
      this.state.participants.length > 0 &&
      this.props.socket.admin
    ) {
      this.setState({ showContinueButton: true });
    }

    const Item = ({ name, finished }) => {
      return (
        <Card>
          <CardItem style={{ alignItems: "center", paddingLeft: 0 }}>
            <Left>
              <Body>
                <Grid>
                  <Row>
                    <Col style={{ width: 40 }}>
                      <View
                        style={{
                          marginTop: "auto",
                          marginBottom: "auto",
                          width: 40
                        }}
                      >
                        <Icon
                          name="face"
                          type="material"
                          color="#BC0000"
                          size={35}
                        />
                      </View>
                    </Col>
                    <Col>
                      <Text style={{ fontSize: 21, marginLeft: 10 }}>
                        {name}
                      </Text>
                    </Col>
                  </Row>
                </Grid>
              </Body>
            </Left>

            <Right>
              <Body
                style={{
                  marginLeft: "auto",

                  alignItems: "center"
                }}
              >
                {finished ? (
                  <View
                    style={{
                      marginTop: "auto",
                      marginBottom: "auto"
                    }}
                  >
                    <Icon
                      name="done"
                      type="material"
                      color="##BC0000"
                      size={35}
                    />
                  </View>
                ) : (
                  <Spinner
                    color="red"
                    style={{
                      width: "30%",
                      height: "30%",
                      marginTop: "auto",
                      marginBottom: "auto"
                    }}
                  />
                )}
              </Body>
            </Right>
          </CardItem>
        </Card>
      );
    };
    return (
      <Container>
        <Grid>
          <Row size={15} style={{ marginTop: 70 }}>
            <Col>
              <Text
                style={{
                  fontSize: 40,
                  alignItems: "center",
                  alignSelf: "center",
                  color: "#BC0000"
                }}
              >
                Please Wait..
              </Text>
            </Col>
          </Row>
          <Row size={5}>
            <Col>
              <Text
                style={{
                  fontSize: 16,
                  alignItems: "center",
                  alignSelf: "center"
                }}
              >
                Participants
              </Text>
            </Col>
          </Row>
          <Row size={110}>
            <Col>
              <FlatList
                data={this.state.participants.filter(
                  par => par.name != "Observer"
                )}
                renderItem={({ item }) => (
                  <Item name={item.name} finished={item.tinderSubmitted} />
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={{
                  flexGrow: 1
                }}
                style={{ marginTop: 15, marginRight: 15, marginLeft: 15 }}
              />
            </Col>
          </Row>
        </Grid>
        {this.state.showContinueButton && (
          <Button
            style={{
              position: "absolute",
              bottom: 30,
              right: 30,
              width: 80,
              height: 80,
              borderRadius: 40,
              justifyContent: "center",
              backgroundColor: "#BC0000"
            }}
            onPress={() => {
              this.props.socket.socket.emit("endTinder", {
                id: this.props.socket.roomName
              });
              if (this.props.socket.admin)
                this.props.navigation.replace("FinalScreen");
            }}
          >
            <Icon
              name="arrow-forward"
              type="material"
              color="white"
              size={35}
            />
          </Button>
        )}
      </Container>
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
