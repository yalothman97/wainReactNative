import React, { Component } from "react";
import { View, FlatList } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "react-native-modal";
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
  static navigationOptions = props => {
    return {
      header: null
    };
  };
  state = {
    participants: [],
    submitted: 0,
    showContinueButton: false
  };

  render() {
    const checkingIfDone = this.state.participants.filter(
      par => par.finished == false
    );
    if (
      checkingIfDone.length == 0 &&
      this.state.showContinueButton == false &&
      this.state.participants.length > 0 &&
      this.props.socket.admin
    ) {
      this.setState({ showContinueButton: true });
    }
    this.props.socket.socket.on("participantsSubmitted", data => {
      this.setState({ submitted: data.participants });
    });
    this.props.socket.socket.on("participantsChanged", data => {
      this.setState({ participants: data.participants });
    });
    if (checkingIfDone.length > 0 && this.state.showContinueButton)
      this.setState({ showContinueButton: false });
    this.props.socket.socket.on("start_swipping", () => {
      if (!this.props.socket.admin)
        this.props.navigation.replace("TinderScreen");
    });

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
                          color="#517fa4"
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
                      color="#517fa4"
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
                  // horizontal
                  alignSelf: "center"
                }}
              >
                {this.props.socket.roomName}
              </Text>
            </Col>
          </Row>
          <Row size={5}>
            <Col>
              <Text
                style={{
                  fontSize: 16,
                  alignItems: "center",
                  // horizontal
                  alignSelf: "center"
                }}
              >
                Participants
              </Text>
            </Col>
          </Row>
          {/* <Text>
          Number of participants in the room: {this.state.participants}
        </Text>
        <Text>
          Number of participants who submitted: {this.state.submitted}
        </Text> */}
          <Row size={110}>
            <Col>
              <FlatList
                data={this.state.participants}
                renderItem={({ item }) => (
                  <Item name={item.name} finished={item.finished} />
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
              justifyContent: "center"
            }}
            onPress={() => {
              this.props.socket.socket.emit("end", {
                id: this.props.socket.roomName
              });
              if (this.props.socket.admin)
                this.props.navigation.replace("TinderScreen");
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

/*


   <AnimatedCircularProgress
                size={240}
                width={15}
                fill={(this.state.submitted / this.state.participants) * 100}
                tintColor="#d92121"
                onAnimationComplete={() => console.log("onAnimationComplete")}
                backgroundColor="#661111"
                style={{
                  // vertical
                  alignItems: "center",
                  // horizontal
                  alignSelf: "center"
                }}
              >
                {fill => (
                  <Text
                    style={{ fontSize: 40 }}
                  >{`${this.state.submitted}/${this.state.participants}`}</Text>
                )}
              </AnimatedCircularProgress>
*/
