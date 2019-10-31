import { combineReducers } from "redux";
//import your reducer files here like the following two lines
import restuarantsReducer from "./restaurantsReducers";
import tagsReducer from "./tagsReducer";
import socketReducer from "./socket";
const rootReducer = combineReducers({
  //the following two lines are an example
  tagsReducer: tagsReducer,
  restaurantsReducer: restuarantsReducer,
  socket: socketReducer
});

export default rootReducer;
