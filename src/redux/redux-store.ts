import { AppReducerActionType, appReducer } from './app-reducer';
import { applyMiddleware, combineReducers, createStore } from "redux";
import { AuthActionType, authReducer } from "./auth-reducer";
import { DialogReducerActionType, dialogReducer } from "./dialog-reducer";
import { ProfileReducerActionType, profileReducer } from "./profile-reducer";
import { SidebarActionType, sidebarReducer } from "./sidebar-reducer";
import { userReducer, UsersReducerActionType } from "./users-reducer";
import { ThunkAction } from 'redux-thunk' ;
import  thunkMiddleware  from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'

export type RootReducersType = ReturnType<typeof rootReducer>;
export type ReduxStoreType = typeof store;

let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogPage: dialogReducer,
  sidebarPage: sidebarReducer,
  userPage: userReducer,
  auth:authReducer,
  form: formReducer,
  app: appReducer
});

export let store = createStore(rootReducer,  applyMiddleware(thunkMiddleware));

export type AppActionType=UsersReducerActionType |AuthActionType | DialogReducerActionType | ProfileReducerActionType| SidebarActionType | AppReducerActionType
export type ThunkType <ReturnType = void> = ThunkAction<void, RootReducersType, unknown, AppActionType>;
