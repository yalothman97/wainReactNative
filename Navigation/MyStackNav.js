import { createStackNavigator } from "react-navigation-stack";

import Home from "../Components/Home";

const MyStackNav = createStackNavigator(
  {
    HomeScreen: Home
  },
  {
    initialRouteName: "HomeScreen"
  }
);

export default MyStackNav;
