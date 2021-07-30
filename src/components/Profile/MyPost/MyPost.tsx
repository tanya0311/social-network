import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import {
  maxLengthCreator,
  required,
} from "../../../utils/validators/validators";
import { Textarea } from "../../OtherInterface/FormsControls/FormControl";
import s from "./MyPost.module.css";
import { MyPostPropsType } from "./MyPostContainer";
import Post from "./Post/Post";

const maxLength50 = maxLengthCreator(50);

const  MyPost=React.memo((props: MyPostPropsType)=> {
  let posts = [...props.PostData].reverse().map((e) => (
    <Post key={e.id} message={e.message} likeCount={e.likeCount} />
  ));

  function addPost(formData: FormDataType) {
    props.addPost(formData.newPostText);
  }

  return (
    <div>
      My post
      <AddMessageReduxForm onSubmit={addPost} />
      <div className={s.post}>{posts}</div>
    </div>
  );
})

export default MyPost;

export type FormDataType = {
  newPostText: string;
};
export const AddNewPostProfile = (props: InjectedFormProps<FormDataType>) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        component={Textarea}
        name="newPostText"
        placeholder="Enter your message"
        validate={[required, maxLength50]}
      />
      <button>Add</button>
    </form>
  );
};

export const AddMessageReduxForm = reduxForm<FormDataType>({
  form: "profileAddNewPostForm ",
})(AddNewPostProfile);
