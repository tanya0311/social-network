
export type NameUserProps = {
  id: string;
  name: string;
};
export type initialStateSidebarPropsType = {
  nameUser: Array<NameUserProps>;
}; 

export type SidebarActionType = any;
let initialState: initialStateSidebarPropsType= {
  nameUser: [
    { id: "1", name: "Света" },
    { id: "2", name: "Коля" },
    { id: "3", name: "Аня" },
  ],
};

export function sidebarReduser(
  state: initialStateSidebarPropsType = initialState,
  action: SidebarActionType
):initialStateSidebarPropsType {
  return state;
}
