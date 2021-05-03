import { type } from "os";
import {  dialogReduser, sentMessageCreatorType, updateNewMessageBodyCreatorType } from "./dialog-reducer";
import { addPostActionCreatorType, profileReduser, updateNewPostActionCreatorType } from "./profile-reducer";
import { sidebarReduser } from "./sidebar-reducer";

export type PostDataProps = {
  id: string;
  message: string;
  likeCount: number;
};

type DialogsDataProps = {
  id: string;
  name: string;
};

type MessageDataProps = {
  id: string;
  text: string;
};
export type NameUserProps = {
  id: string;
  name: string;
};
export type ProfilePageProps = {
  PostData: Array<PostDataProps>;
  newPostText: string;
};
export type MessagePageProps = {
  messageData: Array<MessageDataProps>;
  dialogsData: Array<DialogsDataProps>;
  newMessageBody: string;
};

export type SidebarProps = {
  nameUser: Array<NameUserProps>;
};
export type StatePropsType = {
  profilePage: ProfilePageProps;
  messagePage: MessagePageProps;
  sidebar: SidebarProps;
};

// export type addPostActionType={
//   type:"ADD-POST"
// }

// export type updateNewPostActionType={
//   type:"APDATE-NEW-POST"
//   newText:string

// }
//  export type updateNewMessageBodyActionType={
//     type:"APDATE-NEW-MESSAGE-BODY"
//     body:string
//   }
//  export type SendMESSAGEActionType={
//     type:"SEND-MESSAGE"
//     body:string
//   }
// export type ActionType= addPostActionType | updateNewPostActionType


export type ActionType =
  | addPostActionCreatorType
  | updateNewPostActionCreatorType
  | sentMessageCreatorType
  | updateNewMessageBodyCreatorType;

export type StoreType = {
  _state: StatePropsType;
  // addPost: () => void;
  // updateNewPost: (newText: string) => void;
  subscriber: (observer: (state: StatePropsType) => void) => void;
  _callSubscriber: (state: StatePropsType) => void;
  getState: () => StatePropsType;
  dispatch: (action: ActionType) => void;
};






let store: StoreType = {
  _state: {
    profilePage: {
      PostData: [
        { id: "1", message: "hello", likeCount: 0 },
        { id: "2", message: "yes", likeCount: 5 },
        { id: "3", message: "hi", likeCount: 9 },
        { id: "3", message: "hi", likeCount: 9 },
      ],
      newPostText: "",
    },
    messagePage: {
      messageData: [
        { id: "1", text: "Hi" },
        { id: "2", text: "Hi" },
        { id: "3", text: "Hello" },
        { id: "4", text: "Yes" },
      ],
      dialogsData: [
        { id: "1", name: "1" },
        { id: "2", name: "2" },
        { id: "3", name: "3" },
        { id: "4", name: "4" },
        { id: "5", name: "5" },
      ],
      newMessageBody: "",
    },
    sidebar: {
      nameUser: [
        { id: "1", name: "Света" },
        { id: "2", name: "Коля" },
        { id: "3", name: "Аня" },
      ],
    },
  },
  getState() {
    // debugger;
    return this._state;
  },
  _callSubscriber(state: StatePropsType) {
    console.log("state  changed");
  },
  subscriber(observer: (state: StatePropsType) => void) {
    this._callSubscriber = observer;
  },
  dispatch(action) {
    this._state.profilePage=profileReduser(this._state.profilePage, action)
    this._state.messagePage=dialogReduser(this._state.messagePage, action)
    this._state.sidebar=sidebarReduser(this._state.sidebar, action)
    this._callSubscriber(this._state)
  },
};

export default store;
// window.state=state;
// window.store=store;
