import React from "react";
import { StyleSheet, Text } from "react-native";
import AppContainer from "./Navigation/index";
import { Provider } from "react-redux";
import store from "./redux";
import { fetchRestaurants, fetchTags } from "./redux/actions";
import * as Font from "expo-font";
import { Platform } from "react-native";

store.dispatch(fetchRestaurants());
store.dispatch(fetchTags());

class App extends React.Component {
  state = {
    loading: true
  };
  componentDidMount = async () => {
    if (Platform.OS === "android") {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
      });
      this.setState({ loading: false });
    }
  };

  render() {
    if (!this.state.loading && Platform.OS === "android") {
      return (
        <Provider store={store}>
          <AppContainer />
        </Provider>
      );
    } else
      return (
        <Provider store={store}>
          <AppContainer />
        </Provider>
      );
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
