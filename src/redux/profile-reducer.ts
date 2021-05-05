export type PostDataProps = {
  id: string;
  message: string;
  likeCount: number;
};

export type addPostActionCreatorType = ReturnType<typeof addPostActionCreator>;
export type updateNewPostActionCreatorType = ReturnType<typeof onPostChangeAC>;

export type ProfileReducerActionType =
  | addPostActionCreatorType
  | updateNewPostActionCreatorType;

export const addPostActionCreator = () => ({ type: "ADD-POST" } as const);
export const onPostChangeAC = (newText: string) => {
  return { type: "APDATE-NEW-POST", newText } as const;
};

export type initialStateProps = {
  PostData: Array<PostDataProps>;
  newPostText: string;
};
// или другая запись типизации
//  export type initialStateProps = typeof initialState;

let initialState: initialStateProps = {
  PostData: [
    { id: "1", message: "hello", likeCount: 0 },
    { id: "2", message: "yes", likeCount: 5 },
    { id: "3", message: "hi", likeCount: 9 },
    { id: "3", message: "hi", likeCount: 9 },
  ],
  newPostText: "",
};
// или другая запись типизации
// let initialState= {
//   PostData: [
//     { id: "1", message: "hello", likeCount: 0 },
//     { id: "2", message: "yes", likeCount: 5 },
//     { id: "3", message: "hi", likeCount: 9 },
//     { id: "3", message: "hi", likeCount: 9 },
//   ] as Array<PostDataProps >,
//   newPostText: "",
// };

const ADD_POST = "ADD-POST";
const APDATE_NEW_POST = "APDATE-NEW-POST";

export const profileReduser = (
  state: initialStateProps = initialState,
  action: ProfileReducerActionType
): initialStateProps => {
  // debugger
  switch (action.type) {
    case ADD_POST: {
      let newPost: PostDataProps = {
        id: "1",
        message: state.newPostText,
        likeCount: 0,
      };
      let copyState = { ...state, PostData: [...state.PostData] };
      copyState.PostData.push(newPost);
      copyState.newPostText = "";
      return copyState;
    }

    case APDATE_NEW_POST: {
      let copyState = { ...state };
      copyState.newPostText = action.newText;
      return copyState;
      // return { ...state, newPostText: action.newText };
    }

    default:
      return state;
  }
};
