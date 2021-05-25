import { applyMiddleware, combineReducers, createStore } from "redux";
import { AuthActionType, authReduser } from "./auth-reducer";
import { DialogReducerActionType, dialogReduser } from "./dialog-reducer";
import { ProfileReducerActionType, profileReduser } from "./profile-reducer";
import { SidebarActionType, sidebarReduser } from "./sidebar-reducer";
import { userReduser, UsersReducerActionType } from "./users-reducer";
import { ThunkAction } from 'redux-thunk' ;
import  thunkMiddleware  from 'redux-thunk'

export type RootReducersType = ReturnType<typeof rootReducer>;
export type ReduxStoreType = typeof store;

let rootReducer = combineReducers({
  profilePage: profileReduser,
  dialogPage: dialogReduser,
  sidebarPage: sidebarReduser,
  userPage: userReduser,
  auth:authReduser
});

export let store = createStore(rootReducer,  applyMiddleware(thunkMiddleware));

export type AppActionType=UsersReducerActionType |AuthActionType | DialogReducerActionType | ProfileReducerActionType| SidebarActionType 
export type ThunkType <ReturnType = void> = ThunkAction<void, RootReducersType, unknown, AppActionType>;
