import { type } from "os";


export type NameUserProps = {
  id: string;
  name: string;
};
export type initialStateSidebarProps = {
  nameUser: Array<NameUserProps>;
}; 

export type ActionType = any;
let initialState: initialStateSidebarProps = {
  nameUser: [
    { id: "1", name: "Света" },
    { id: "2", name: "Коля" },
    { id: "3", name: "Аня" },
  ],
};

export function sidebarReduser(
  state: initialStateSidebarProps = initialState,
  action: ActionType
) {
  return state;
}
