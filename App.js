import React from "react";
import { StyleSheet, Text, View } from "react-native";

//Redux
import { Provider } from "react-redux";
import store from "./redux";
import Home from "./Home";

function App(props) {
  console.log(props.restaurants);
  return (
    <Provider store={store}>
      <Home />
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
const mapStateToProps = state => ({
  restaurants: state.restaurantsReducer.restaurants
});
export default App;
