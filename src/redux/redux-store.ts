import { combineReducers, createStore } from "redux";
import {
  dialogReduser,
  sentMessageCreatorType,
  updateNewMessageBodyCreatorType,
} from "./dialog-reducer";
import {
  addPostActionCreatorType,
  profileReduser,
  updateNewPostActionCreatorType,
} from "./profile-reducer";
import { sidebarReduser } from "./sidebar-reducer";
import { StoreType } from "./state";

export type reducersType = ReturnType<typeof reducers>;
export type storeType = typeof store;

// export type ActionType =
//   | addPostActionCreatorType
//   | updateNewPostActionCreatorType
//   | sentMessageCreatorType
//   | updateNewMessageBodyCreatorType;

let reducers = combineReducers({
  profilePage: profileReduser,
  dialogPage: dialogReduser,
  sidebarPage: sidebarReduser,
});

let store = createStore(reducers);

export default store;
