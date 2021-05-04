import React from "react";
import {
  sentMessageCreator,
  updateNewMessageBodyCreator,
} from "../../redux/dialog-reducer";
import StoreContext from "../../StoreContext";
import Dialog from "./Dialogs";

function DialogsContainer() {
  return (
    <StoreContext.Consumer>
      {(store) => {
        const stateDialog = store.getState().dialogPage;

        let addMessageText = () => {
          store.dispatch(sentMessageCreator());
        };

        let onNewMessageChange = (body: string) => {
          store.dispatch(updateNewMessageBodyCreator(body));
        };

        return (
          <Dialog
            updateNewMessage={onNewMessageChange}
            addMessageText={addMessageText}
            state1={stateDialog}
          />
        );
      }}
    </StoreContext.Consumer>
  );
}

export default DialogsContainer;
