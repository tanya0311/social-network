import React from "react";
import { connect } from "react-redux";
import {
  addPostAC,
  PostDataProps,
  ProfileUserPropsType,
} from "../../../redux/profile-reducer";
import { RootReducersType } from "../../../redux/redux-store";
import MyPost from "./MyPost";
import { Dispatch } from "redux";

type MapStateToPropsType = {
  PostData: Array<PostDataProps>;
  profile: ProfileUserPropsType | null;
};
type MapDispathToPropsType = {
  addPost: (newPostText: string) => void;
};
export type MyPostPropsType = MapStateToPropsType & MapDispathToPropsType;

const mapStateToProps = (state: RootReducersType): MapStateToPropsType => {
  return {
    PostData: state.profilePage.PostData,
    profile: state.profilePage.profile,
  };
};
const mapDispathToProps = (dispatch: Dispatch): MapDispathToPropsType => {
  return {
    addPost: (newPostText: string) => {
      dispatch(addPostAC(newPostText));
    },
  };
};
const MyPostContainer = connect<
  MapStateToPropsType,
  MapDispathToPropsType,
  {},
  RootReducersType
>(
  mapStateToProps,
  mapDispathToProps
)(MyPost);
export default MyPostContainer;
