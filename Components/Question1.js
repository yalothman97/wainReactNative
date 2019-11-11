import React, { Component } from "react";
import { Container, Text, Button, Spinner } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  StyleSheet,
  FlatList,
  TextInput,
  Dimensions,
  View,
  ScrollView
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { setAdmin } from "../redux/actions";
import { Input } from "react-native-elements";

import { TagSelect } from "react-native-tag-select";

class Question extends Component {
  static navigationOptions = props => {
    let tags = props.navigation.getParam("tags");
    let socket = props.navigation.getParam("socket");
    let name = props.navigation.getParam("name");
    console.log(tags);
    if (tags)
      return {
        header: null,
        headerRight: !tags.length ? null : (
          <Button
            style={{
              marginRight: 10
            }}
            onPress={() => {
              {
                socket.socket.emit("quiz_submit", {
                  id: socket.roomName,
                  name: name,
                  tags: tags,
                  budgets: 4
                });

                props.navigation.replace("WaitingScreen");
              }
            }}
            transparent
          >
            <Text style={{ color: "#c92020" }}>Done</Text>
          </Button>
        )
      };
    else return null;
  };
  constructor(props) {
    super(props);

    // socket.emit("channel1", "Hi server"); // emits 'hi server' to your server
  }
  state = {
    tags: [],
    selectedTags: [],
    participants: 0,
    query: ""
  };

  componentDidMount = () => {
    // this.join();

    this.props.navigation.setParams({
      socket: this.props.socket,
      name: this.props.socket.nickname,
      tags: []
    });
  };

  submitAnswer() {
    // console.log(this.refs.cats.value, this.refs.flavs.value);
    this.props.socket.socket.emit("quiz_submit", {
      tags: this.state.selectedTags,

      budget: 4
    });
  }
  handleQuery = e => {
    this.setState({ query: e });
  };
  render() {
    this.props.socket.socket.on("admin", data => {
      console.log("I'm the admin");
      this.props.setAdmin();
    });
    this.props.socket.socket.on("quiz", data => {
      !this.state.tags.length && this.setState({ tags: data.tags });
    });
    if (!this.state.tags.length)
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
    const Item = ({ name, id }) => {
      return (
        <Col
          onPress={() => {
            let newArray = this.state.selectedTags;
            if (newArray.includes(id)) {
              newArray = newArray.filter(x => x !== id);
            } else newArray.push(id);

            console.log("from button", newArray);
            this.props.navigation.setParams({
              tags: newArray
            });
            this.setState({ selectedTags: newArray, [id]: !this.state[id] });
          }}
        >
          <TouchableOpacity
            style={
              !this.state[id] || this.state[id] === false
                ? styles.preferenceItem
                : styles.preferenceItemClicked
            }
          >
            <Text style={styles.title}>{name}</Text>
          </TouchableOpacity>
        </Col>
      );
    };
    return (
      <Container>
        <Grid>
          <Row
            size={5}
            style={{
              // vertical
              alignItems: "center",
              // horizontal
              alignSelf: "center",
              marginTop: 40
            }}
          >
            <Text
              style={{
                fontWeight: "800",
                color: "#BC0000",
                fontSize: 20
              }}
            >
              Choose what you like
            </Text>
          </Row>
          <Row
            size={7}
            style={{
              // vertical
              alignItems: "center",
              // horizontal
              alignSelf: "center"
            }}
          >
            <Input
              containerStyle={{
                height: 40,

                width: Dimensions.get("window").width - 20,
                paddingLeft: 10,
                paddingRight: 10
              }}
              placeholder="Search for keywords"
              onChangeText={this.handleQuery}
            />
          </Row>
          {/* data={this.state.tags.filter(tag =>
                  tag.name.includes(this.state.query)
                )} */}
          <Row size={88}>
            {this.state.tags && (
              <ScrollView
                contentContainerStyle={{
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 15,
                  marginBottom: 50,
                  height: Dimensions.get("window").height
                }}
              >
                <TagSelect
                  theme="danger"
                  ref={tag => {
                    this.tags = tag;
                  }}
                  data={this.state.tags.filter(tag =>
                    tag.label.includes(this.state.query)
                  )}
                  itemStyle={styles.customItem}
                  itemStyleSelected={styles.customItemSelected}
                  itemLabelStyle={styles.customItemLabel}
                  itemLabelStyleSelected={styles.customItemLabelSelected}
                />
              </ScrollView>
            )}
          </Row>
          <Row
            size={8}
            style={{
              alignSelf: "center"
            }}
          >
            <View style={{ alignSelf: "center" }}>
              <Button
                style={{
                  alignSelf: "center",

                  justifyContent: "center",
                  backgroundColor: "#BC0000",
                  borderRadius: 20,
                  marginBottom: 5,
                  width: Dimensions.get("window").width * 0.9
                }}
                onPress={() => {
                  console.log(this.tags.itemsSelected);
                  const tagsToSend = this.tags.itemsSelected.map(tag => tag.id);
                  this.props.socket.socket.emit("quiz_submit", {
                    id: this.props.socket.roomName,
                    name: this.props.socket.nickname,
                    tags: tagsToSend,
                    budgets: 4
                  });

                  this.props.navigation.replace("WaitingScreen");
                }}
              >
                <Text style={{ textAlign: "center" }}>Submit</Text>
              </Button>
            </View>
          </Row>
        </Grid>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    color: "white"
  },
  preferenceItem: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    backgroundColor: "#f13939",
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 30
  },
  preferenceItemClicked: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: "#5c0303",
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 30,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9
  },
  customItem: {
    borderColor: "#BC0000",
    borderWidth: 1
  },
  customItemSelected: {
    backgroundColor: "#BC0000",
    borderColor: "#BC0000",
    borderWidth: 2
  },
  customItemLabel: {
    color: "#BC0000",
    fontSize: 16
  },
  customItemLabelSelected: {
    color: "white"
  }
});

const mapStateToProps = state => ({
  socket: state.socket
});
const mapDispatchToProps = dispatch => {
  return {
    setAdmin: () => dispatch(setAdmin())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Question);
