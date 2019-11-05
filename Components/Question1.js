import React, { Component } from "react";
import { Container, Text, Button, Spinner } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { StyleSheet, FlatList, TextInput, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { setAdmin } from "../redux/actions";

class Question extends Component {
  static navigationOptions = props => {
    let tags = props.navigation.getParam("tags");
    let socket = props.navigation.getParam("socket");
    let name = props.navigation.getParam("name");
    return {
      headerRight: (
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
  };
  constructor(props) {
    super(props);

    // socket.emit("channel1", "Hi server"); // emits 'hi server' to your server
  }
  state = {
    tags: null,
    selectedTags: [],
    participants: 0
  };

  componentDidMount = () => {
    // this.join();

    this.props.navigation.setParams({
      socket: this.props.socket,
      name: this.props.socket.nickname
    });
  };

  submitAnswer() {
    // console.log(this.refs.cats.value, this.refs.flavs.value);
    this.props.socket.socket.emit("quiz_submit", {
      tags: this.state.selectedTags,

      budget: 4
    });
  }

  render() {
    this.props.socket.socket.on("admin", data => {
      console.log("I'm the admin");
      this.props.setAdmin();
    });
    this.props.socket.socket.on("quiz", data => {
      !this.state.tags && this.setState({ tags: data.tags });
    });
    if (!this.state.tags)
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
            newArray.push(id);
            this.props.navigation.setParams({ tags: this.state.selectedTags });
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
              alignSelf: "center"
            }}
          >
            <Text
              style={{
                fontWeight: "800",
                color: "#BC0000"
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
            <TextInput
              style={{
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 10,
                width: Dimensions.get("window").width - 20,
                paddingLeft: 10,
                paddingRight: 10
              }}
              placeholder="Search for keywords"
            />
          </Row>
          <Row size={88}>
            {this.state.tags && (
              <FlatList
                data={this.state.tags}
                renderItem={({ item }) => (
                  <Item name={item.name} id={item.id} />
                )}
                keyExtractor={item => item.id}
                numColumns={4}
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: "center"
                }}
                style={{ marginTop: 15, marginRight: 15, marginLeft: 15 }}
              />
            )}
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
    backgroundColor: "#c92020",
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
