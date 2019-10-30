import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Wain Nakel</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
const mapStateToProps = state => ({
  restaurants: state.restaurantsReducer.restaurants
});
export default connect(mapStateToProps)(Home);
