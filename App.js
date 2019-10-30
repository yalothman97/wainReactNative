import React from "react";
import { StyleSheet } from "react-native";
import AppContainer from "./Navigation/index";

//Redux
import { Provider } from "react-redux";
import store from "./redux";

function App(props) {
  console.log(props.restaurants);
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
export default App;
