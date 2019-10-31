import React from "react";
import { StyleSheet } from "react-native";
import AppContainer from "./Navigation/index";
import { Provider } from "react-redux";
import store from "./redux";
import { fetchRestaurants, fetchTags } from "./redux/actions";
store.dispatch(fetchRestaurants());
store.dispatch(fetchTags());

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
    if (!this.state.loading)
      return (
        <Provider store={store}>
          <AppContainer />
        </Provider>
      );
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
