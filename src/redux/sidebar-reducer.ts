import { ActionType, SidebarProps, StoreType } from "./state";

let initialState = {nameUser: [
  { id: "1", name: "Света" },
  { id: "2", name: "Коля" },
  { id: "3", name: "Аня" },
],};


export function sidebarReduser(state: SidebarProps = initialState , action: ActionType) {
  
  return state;
}
// "redux": "^4.1.0",