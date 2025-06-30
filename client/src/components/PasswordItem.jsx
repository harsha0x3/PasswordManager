import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCopy,
  faEye,
  faEyeSlash,
  faFloppyDisk,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useUpdatePasswordDataMutation } from "../slices/passwordsApiSlice";
import PasswordData from "./PasswordData";

const PasswordItem = ({ passwordData }) => {
  console.log("PasswordData");

  console.log(passwordData.password);

  const [edit, setEdit] = useState(false);
  const [account, setAccount] = useState(passwordData.account);
  const [password, setPassword] = useState(passwordData.password);
  const [updatePasswordData, { isLoading }] = useUpdatePasswordDataMutation();
  const handleEdit = async () => {
    console.log("Edit: " + edit);
    if (edit) {
      try {
        const updatedData = await updatePasswordData({
          id: passwordData._id,
          account,
          password,
        }).unwrap();
        setAccount(updatedData.account);
        setPassword(updatedData.password);
      } catch (error) {
        console.log(error);
      }
    }

    setEdit(!edit);
  };
  const handleCancel = () => {
    setAccount(passwordData.account);
    setPassword(passwordData.password);
    setEdit(false);
  };
  return (
    <li className="flex flex-col gap-0.5 border border-white bg-[#41413c]/35 mb-3 rounded-lg p-4">
      <label htmlFor={`account-${passwordData._id}`}>
        Account
        <input
          className="text-black-50 border-white bg-gray-200/25 rounded-lg px-4 pb-2"
          id={`account-${passwordData._id}`}
          readOnly={!edit}
          value={account}
          onChange={(e) => {
            setAccount(e.target.value);
          }}
        ></input>
      </label>

      <label htmlFor={`password-${passwordData._id}`}>
        Password
        <input
          id={`password-${passwordData._id}`}
          className=" text-black border-white bg-gray-200/25 rounded-lg p-4"
          readOnly={!edit}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
      </label>
      <button onClick={handleEdit}>
        <FontAwesomeIcon icon={edit ? faFloppyDisk : faPenToSquare} />
      </button>
      {edit && <button onClick={handleCancel}>cancel</button>}
    </li>
  );
};

export default PasswordItem;
