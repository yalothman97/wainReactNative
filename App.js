import React from "react";
import { StyleSheet } from "react-native";

// react native addtional imports temp removed Text, View

// StackNav
import AppContainer from "./Navigation/index";

export default function App() {
  return <AppContainer />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
