import { combineReducers } from "redux";
import tagsReducer from "./tagsReducer";
import socketReducer from "./socket";

const rootReducer = combineReducers({
  tagsReducer: tagsReducer,
  socket: socketReducer
});

export default rootReducer;
