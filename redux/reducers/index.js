import { combineReducers } from "redux";
//import your reducer files here like the following two lines
import restuarantsReducer from "./restaurantsReducers";

const rootReducer = combineReducers({
  //the following two lines are an example
  restaurantsReducer: restuarantsReducer
});

export default rootReducer;
