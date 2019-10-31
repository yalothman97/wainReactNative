import React from "react";
import { StyleSheet } from "react-native";
import AppContainer from "./Navigation/index";

//Redux
import { Provider } from "react-redux";
import store from "./redux";
import { fetchRestaurants, fetchTags } from "./redux/actions";
store.dispatch(fetchRestaurants());
store.dispatch(fetchTags());

function App() {
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
