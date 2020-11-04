import { combineReducers } from "redux";
import userAuthReducer from "./userAuthReducer";
import dareReducer from "./dareReducer";
import entryReducer from "./entryReducer";
import durranUserReducer from "./durranUserReducer";

export default combineReducers({
  authReducer: userAuthReducer,
  dareReducer: dareReducer,
  entryReducer: entryReducer,
  durranUserReducer: durranUserReducer
});
