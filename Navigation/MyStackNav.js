import { createStackNavigator } from "react-navigation-stack";

import Home from "../Components/Home";
import Question1 from "../Components/Question1";
import Waiting from "../Components/Waiting";
import TinderPage from "../Components/TinderPage";
import TinderWaiting from "../Components/TinderWaiting";
import FinalRecommendation from "../Components/FinalRecommendation";

const MyStackNav = createStackNavigator(
  {
    HomeScreen: Home,
    Question1Screen: Question1,
    WaitingScreen: Waiting,
    TinderScreen: TinderPage,
    TinderWaitingScreen: TinderWaiting,
    FinalScreen: FinalRecommendation
  },
  {
    initialRouteName: "HomeScreen"
  }
);

export default MyStackNav;
