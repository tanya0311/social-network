import React from "react";
import { connect } from "react-redux";
import {
  addPostAC,
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
    profile:state.profilePage.profile
  };
};
const mapDispathToProps = (dispatch: Dispatch): MapDispathToPropsType => {
  return {
    updateNewPostText: (newText: string) => {
      dispatch(onPostChangeAC(newText));
    },
    addPost: () => {
      dispatch(addPostAC());
    },
  };
};
const MyPostContainer = connect<MapStateToPropsType, MapDispathToPropsType, {}, RootReducersType>(mapStateToProps, mapDispathToProps)(MyPost);
export default MyPostContainer;
