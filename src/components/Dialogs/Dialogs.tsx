import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { Textarea } from "../OtherInterface/FormsControls/FormControl";
import DialogItem from "./DialogItem/DialogItem";
import s from "./Dialogs.module.css";
import { DialogPropsType } from "./DialogsContainer";
import MessageItem from "./MessageItem /MessageItem";

type FormDataType = {
  newMessageBody: string;
};

const maxLength100 = maxLengthCreator(100);

function Dialog(props: DialogPropsType) {
  let dialogsElement = props.state1.dialogsData.map((e) => (
    <DialogItem key={e.id} name={e.name} id={e.id} />
  ));

  let messageElement = props.state1.messageData.map((e) => (
    <MessageItem key={e.id} text={e.text} id={e.id} />
  ));
  // let addMessageText = () => {
  //   props.addMessageText();
  // };
  // let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   let body = e.currentTarget.value;
  //   props.updateNewMessage(body);
  // };

  //!  )))))))))))
  const addNewMessage = (formData: FormDataType) => {
    props.addMessageText(formData.newMessageBody);
    // console.log(formData.newMessageBody);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogItems}>{dialogsElement}</div>

      <div className={s.messages}>
        <div>{messageElement}</div>

        {/* < AddMessageForm   addMessageText={props.addMessageText} updateNewMessage={props.updateNewMessage}  state1={props.state1}/> */}
        {/* < AddMessageForm   /> */}
        <AddMessageReduxForm onSubmit={addNewMessage} />
      </div>
    </div>
  );
}

export default Dialog;

export const AddMessageForm = (props: InjectedFormProps<FormDataType>) => {
  return (
    <form onSubmit={props.handleSubmit} className={s.dialogAnswer}>
      <Field
        component={Textarea}
        name="newMessageBody"
        placeholder="Enter your message"
        validate={[required, maxLength100]}
      />
      {/* <textarea
    value={props.state1.newMessageBody}
    onChange={onNewMessageChange}
  ></textarea> */}
      <button>Add</button>
      {/* <button onClick={addMessageText}>Add</button> */}
    </form>
  );
};

export const AddMessageReduxForm = reduxForm<FormDataType>({
  form: "dialogAddMessageForm ",
})(AddMessageForm);
