import React from "react";
import StoreContext from "../../StoreContext";
import Sidebar from "./sidebar/sidebar";

function NavContainer() {
  return (
    <StoreContext.Consumer>
      {(store) => {
        const stateNav = store.getState().sidebarPage;

        return <Sidebar title="friends" nameUser={stateNav.nameUser} />;
      }}
    </StoreContext.Consumer>
  );
}

export default NavContainer;
