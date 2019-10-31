import React from "react";
import { StyleSheet } from "react-native";

// react native addtional imports temp removed Text, View

// StackNav
import AppContainer from "./Navigation/index";

export default class App extends React.Component {
  state = {
    loading: true
  };
  async componentDidMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }
  render() {
    if (!this.state.loading) return <AppContainer />;
    else return <></>;
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
