import { combineReducers, createStore } from "redux";
import { dialogReduser } from "./dialog-reducer";
import { profileReduser } from "./profile-reducer";
import { sidebarReduser } from "./sidebar-reducer";
import { userReduser } from "./users-reducer";

export type RootReducersType = ReturnType<typeof rootReducer>;
export type ReduxStoreType = typeof store;

let rootReducer = combineReducers({
  profilePage: profileReduser,
  dialogPage: dialogReduser,
  sidebarPage: sidebarReduser,
  userPage: userReduser,
});

let store = createStore(rootReducer);

export default store;
