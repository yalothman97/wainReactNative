import { createStackNavigator } from "react-navigation-stack";

import Home from "../Components/Home";
import Question1 from "../Components/Question1";
import Waiting from "../Components/Waiting";
import TinderPage from "../Components/TinderPage";
const MyStackNav = createStackNavigator(
  {
    HomeScreen: Home,
    Question1Screen: Question1,
    WaitingScreen: Waiting,
    TinderScreen: TinderPage
  },
  {
    initialRouteName: "HomeScreen"
  }
);

export default MyStackNav;
