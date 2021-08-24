export type DialogsDataProps = {
  id: string;
  name: string;
};

export type MessageDataProps = {
  id: string;
  text: string;
};

export type sentMessageCreatorType = ReturnType<typeof sentMessageCreator>;
export type DialogReducerActionType = sentMessageCreatorType;

export type ReduserInitialStateProps = typeof initialState;

export type initialStatePropsType = {
  messageData: Array<MessageDataProps>;
  dialogsData: Array<DialogsDataProps>;
};

const SEND_MESSAGE = "SEND-MESSAGE";

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
};

export function dialogReducer(
  state: ReduserInitialStateProps = initialState,
  action: DialogReducerActionType
): initialStatePropsType {
  let stateCopy;
  switch (action.type) {

    case SEND_MESSAGE:
      let body = action.newMessageBody;
      stateCopy = {
        ...state,
        messageData: [...state.messageData, { id: "4", text: body }],
      };

      return stateCopy;

    default:
      return state;
  }
}
export const sentMessageCreator = (newMessageBody: string) =>
  ({ type: SEND_MESSAGE, newMessageBody } as const);

