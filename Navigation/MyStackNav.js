import { createStackNavigator } from "react-navigation-stack";

import Home from "../Components/Home";
import Question1 from "../Components/Question1";
import Waiting from "../Components/Waiting";

const MyStackNav = createStackNavigator(
  {
    HomeScreen: Home,
    Question1Screen: Question1,
    WaitingScreen: Waiting
  },
  {
    initialRouteName: "HomeScreen"
  }
);

export default MyStackNav;
