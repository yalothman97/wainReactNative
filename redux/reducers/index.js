import { combineReducers } from "redux";
//import your reducer files here like the following two lines
import restuarantsReducer from "./restaurantsReducers";
import tagsReducer from "./tagsReducer";
const rootReducer = combineReducers({
  //the following two lines are an example
  tagsReducer: tagsReducer,
  restaurantsReducer: restuarantsReducer
});

export default rootReducer;
