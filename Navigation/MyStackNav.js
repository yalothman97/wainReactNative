import { createStackNavigator } from "react-navigation-stack";

import Home from "../Components/Home";
import Question1 from "../Components/Question1";

const MyStackNav = createStackNavigator(
  {
    HomeScreen: Home,
    Question1Screen: Question1
  },
  {
    initialRouteName: "Question1Screen"
  }
);

export default MyStackNav;
