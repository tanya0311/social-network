import { ActionType, MessagePageProps } from "./state";


const APDATE_NEW_MESSAGE_BODY = "APDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND-MESSAGE";

type DialogsDataProps = {
  id: string;
  name: string;
};

type MessageDataProps = {
  id: string;
  text: string;
};
export type ReduserInitialStateProps = typeof initialState;

export type initialStateProps = {
  messageData: Array<MessageDataProps>;
  dialogsData: Array<DialogsDataProps>;
  newMessageBody: string;
};


let initialState:initialStateProps={
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
  
};

export function dialogReduser(state: ReduserInitialStateProps=initialState, action: ActionType) {

  switch (action.type) {
    case APDATE_NEW_MESSAGE_BODY:
      state.newMessageBody = action.body;
      return state;
    case SEND_MESSAGE:
      let body = state.newMessageBody;
      state.newMessageBody = "";
      state.messageData.push({ id: "4", text: body });
      return state;

    default:
      return state;
  }
}

export type sentMessageCreatorType = ReturnType<typeof sentMessageCreator>;
export type updateNewMessageBodyCreatorType = ReturnType< typeof updateNewMessageBodyCreator>;

export const sentMessageCreator = () => ({ type: "SEND-MESSAGE" } as const);

export const updateNewMessageBodyCreator = (body:string) => {
  return { type: "APDATE-NEW-MESSAGE-BODY", body:body } as const;
};
