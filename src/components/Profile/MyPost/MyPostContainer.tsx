import React from "react";
import { connect } from "react-redux";
import {
  addPostActionCreator,
  initialStateProps,
  onPostChangeAC,
} from "../../../redux/profile-reducer";
import { RootReducersType } from "../../../redux/redux-store";
import MyPost from "./MyPost";
import { Dispatch } from "redux";

type MapStateToPropsType = initialStateProps;
type MapDispathToPropsType = {
  updateNewPostText: (newText: string) => void;
  addPost: () => void;
};
export type MyPostPropsType = MapStateToPropsType & MapDispathToPropsType;

const mapStateToProps = (state: RootReducersType): MapStateToPropsType => {
  return {
    PostData: state.profilePage.PostData,
    newPostText: state.profilePage.newPostText,
  };
};
const mapDispathToProps = (dispatch: Dispatch): MapDispathToPropsType => {
  return {
    updateNewPostText: (newText: string) => {
      dispatch(onPostChangeAC(newText));
    },
    addPost: () => {
      dispatch(addPostActionCreator());
    },
  };
};
const MyPostContainer = connect(mapStateToProps, mapDispathToProps)(MyPost);
export default MyPostContainer;
