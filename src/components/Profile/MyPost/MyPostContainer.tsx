import React from "react";
import {
  addPostActionCreator,
  onPostChangeAC,
} from "../../../redux/profile-reducer";
import StoreContext from "../../../StoreContext";
import MyPost from "./MyPost";

function MyPostContainer() {
  return (
    <StoreContext.Consumer>
      {(store) => {
        const stateProfile = store.getState().profilePage;
        function AddPost() {
          store.dispatch(addPostActionCreator());
        }

        function OnPostChange(newText: string) {
          store.dispatch(onPostChangeAC(newText));
        }
        return (
          <MyPost
            updateNewPostText={OnPostChange}
            addPost={AddPost}
            PostData={stateProfile.PostData}
            newPostText={stateProfile.newPostText}
          />
        );
      }}
    </StoreContext.Consumer>
  );
}

export default MyPostContainer;
