import React, { ChangeEvent, useState } from "react";
import { useEffect } from "react";

type ProfileStatusPrposType = {
  status: string;
  updateStatus: (status: string) => void;
};

const ProfileStatusWhithHooks = (props: ProfileStatusPrposType) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [status, setStatus] = useState<string>(props.status);

  useEffect(()=>{
    setStatus(props.status)
  },[props.status])

  const onClickHandler = () => {
    setEditMode(!editMode);
  };
  const deactivateEditMode = () => {
    setEditMode(!editMode);
    props.updateStatus(status);
  };
  const onSatatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };
  return (
    <div>
      {!editMode ? (
        <div>
          <span onDoubleClick={onClickHandler}>
            {props.status || " --- no status"}
          </span>
        </div>
      ) : (
        <div>
          <input
            autoFocus
            onBlur={deactivateEditMode}
            onChange={onSatatusChange}
            value={status}
            type="text"
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWhithHooks;
