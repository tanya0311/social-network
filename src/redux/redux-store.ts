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


export type RootReducersType = ReturnType<typeof rootReducer>; //т.у что она возвращает ReturnType
export type ReduxStoreType = typeof store;

export type ActionType =
  | addPostActionCreatorType
  | updateNewPostActionCreatorType
  | sentMessageCreatorType
  | updateNewMessageBodyCreatorType; 
  // combReducers () - функция Redux, которая объединяет все reduxReducers; принимает объект с  ключ-значение 

let rootReducer = combineReducers({
  profilePage: profileReduser,
  dialogPage: dialogReduser,
  sidebarPage: sidebarReduser,
});

let store = createStore(rootReducer);

export default store;
