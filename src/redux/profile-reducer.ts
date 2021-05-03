import { ActionType, PostDataProps, ProfilePageProps } from "./state";


const ADD_POST = "ADD-POST";
const APDATE_NEW_POST = "APDATE-NEW-POST";

let initialState={
  PostData: [
    { id: "1", message: "hello", likeCount: 0 },
    { id: "2", message: "yes", likeCount: 5 },
    { id: "3", message: "hi", likeCount: 9 },
    { id: "3", message: "hi", likeCount: 9 },
  ],
  newPostText: "",
}

export function profileReduser(state: ProfilePageProps =initialState , action: ActionType) {
// debugger
  switch (action.type) {
    case ADD_POST:
      let newPost: PostDataProps = {
        id: "1",
        message: state.newPostText,
        likeCount: 0,
      };
      state.PostData.push(newPost);
      state.newPostText = "";
      return state;
     
    case APDATE_NEW_POST:
      state.newPostText = action.newText;
      return state;

    default:
      return state;
  }
}


export type addPostActionCreatorType = ReturnType<typeof addPostActionCreator>;
export type updateNewPostActionCreatorType = ReturnType<typeof onPostChangeAC>;

  export const addPostActionCreator = () => ({ type: "ADD-POST" } as const);
  export const onPostChangeAC = (newText: string) => {
   return { type: "APDATE-NEW-POST", newText } as const;
 };