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
import { userReduser } from "./users-reducer";

export type RootReducersType = ReturnType<typeof rootReducer>;
export type ReduxStoreType = typeof store;

// export type ActionType =
//   | addPostActionCreatorType
//   | updateNewPostActionCreatorType
//   | sentMessageCreatorType
//   | updateNewMessageBodyCreatorType;

let rootReducer = combineReducers({
  profilePage: profileReduser,
  dialogPage: dialogReduser,
  sidebarPage: sidebarReduser,
  userPage: userReduser
});

let store = createStore(rootReducer);

export default store;
