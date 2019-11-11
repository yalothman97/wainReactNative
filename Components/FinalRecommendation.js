import React, { Component } from "react";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Spinner, Button } from "native-base";
import { TagSelect } from "react-native-tag-select";

export class FinalRecommendation extends Component {
  static navigationOptions = () => {
    return {
      header: null
    };
  };
  state = {
    restaurant: null
  };

  render() {
    this.props.socket.socket.on("give_result", data => {
      this.setState({ restaurant: data });
    });

    if (!this.state.restaurant)
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
    else {
      let tags = this.state.restaurant.tags.map(tag => {
        return { id: tag, label: this.props.tags.find(t => t.id == tag).label };
      });

      console.log(tags);
      return (
        <View style={{ marginTop: 50 }}>
          <Text
            style={{
              fontSize: 40,
              alignSelf: "center",
              marginTop: 20,
              marginLeft: 20,
              color: "#BC0000"
            }}
          >
            {this.state.restaurant.name}{" "}
          </Text>
          <Image
            style={{
              height: Dimensions.get("window").height * 0.53,
              marginTop: 20,
              marginRight: 10,
              marginLeft: 10,
              borderRadius: 20
            }}
            resizeMode="contain"
            source={{ uri: this.state.restaurant.image }}
          ></Image>
          <View
            style={{ marginLeft: 20, marginRight: 20 }}
            pointerEvents="none"
          >
            <TagSelect
              theme="danger"
              ref={tag => {
                this.tags = tag;
              }}
              data={tags}
              itemStyle={styles.customItem}
              itemStyleSelected={styles.customItem}
              itemLabelStyle={styles.customItemLabel}
              itemLabelStyleSelected={styles.customItemLabel}
            />
          </View>
          <Button
            style={{
              alignSelf: "center",

              justifyContent: "center",
              backgroundColor: "#BC0000",
              borderRadius: 20,
              marginBottom: 5,
              marginTop: 15,
              width: Dimensions.get("window").width * 0.9
            }}
            onPress={() => {
              this.props.navigation.replace("HomeScreen");
            }}
          >
            <Text style={{ textAlign: "center", color: "white" }}>RESTART</Text>
          </Button>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
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
  socket: state.socket,
  tags: state.tagsReducer.tags
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinalRecommendation);
