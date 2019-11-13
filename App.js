import React from "react";
import AppContainer from "./Navigation/index";
import { Provider } from "react-redux";
import store from "./redux";
import { fetchTags } from "./redux/actions";
import * as Font from "expo-font";
import { Platform } from "react-native";

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
