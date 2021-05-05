export type DialogsDataProps = {
  id: string;
  name: string;
};

export type MessageDataProps = {
  id: string;
  text: string;
};

export type sentMessageCreatorType = ReturnType<typeof sentMessageCreator>;
export type updateNewMessageBodyCreatorType = ReturnType<
  typeof updateNewMessageBodyCreator
>;
export type DialogReducerActionType =
  | sentMessageCreatorType
  | updateNewMessageBodyCreatorType;

//или
// export type DialogReducerActionType = ReturnType<typeof sentMessageCreator> | ReturnType< typeof updateNewMessageBodyCreator>;

export type ReduserInitialStateProps = typeof initialState;

export type initialStatePropsType = {
  messageData: Array<MessageDataProps>;
  dialogsData: Array<DialogsDataProps>;
  newMessageBody: string;
};

export const sentMessageCreator = () => ({ type: "SEND-MESSAGE" } as const);

export const updateNewMessageBodyCreator = (body: string) => {
  return { type: "APDATE-NEW-MESSAGE-BODY", body: body } as const;
};

let initialState: initialStatePropsType = {
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

const APDATE_NEW_MESSAGE_BODY = "APDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND-MESSAGE";

export function dialogReduser(
  state: ReduserInitialStateProps = initialState,
  action: DialogReducerActionType
): initialStatePropsType {
  let stateCopy;
  switch (action.type) {
    case APDATE_NEW_MESSAGE_BODY:
      return { ...state, newMessageBody: action.body };

    case SEND_MESSAGE:
      let body = state.newMessageBody;
      stateCopy = {
        ...state,
        newMessageBody: "",
        messageData: [...state.messageData, { id: "4", text: body }],
      };

      return stateCopy;

    default:
      return state;
  }
}
