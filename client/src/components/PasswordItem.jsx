import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faPenToSquare,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useUpdatePasswordDataMutation } from "../slices/passwordsApiSlice";
import { toast } from "react-toastify";

const PasswordItem = ({ passwordData }) => {
  const [edit, setEdit] = useState(false);
  const [account, setAccount] = useState(passwordData.account);
  const [password, setPassword] = useState(passwordData.password);
  const [updatePasswordData] = useUpdatePasswordDataMutation();

  const handleEdit = async () => {
    if (edit) {
      try {
        const updated = await updatePasswordData({
          id: passwordData._id,
          account,
          password,
        }).unwrap();
        setAccount(updated.account);
        setPassword(updated.password);
      } catch (error) {
        toast.error(error.data?.msg || "Fectching Failed");
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
    <li className="rounded-lg text-white mb-4">
      <label className="block mb-2">
        <span className="text-sm">Account</span>
        <input
          value={account}
          readOnly={!edit}
          onChange={(e) => setAccount(e.target.value)}
          className="w-full mt-1 rounded px-3 py-1 bg-white/20"
        />
      </label>

      <label className="block mb-2">
        <span className="text-sm">Password</span>
        <input
          value={password}
          readOnly={!edit}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-1 rounded px-3 py-1 bg-white/20"
        />
      </label>

      <div className="flex gap-2 mt-2">
        <button
          onClick={handleEdit}
          className="text-sm px-3 py-1 bg-gray-700 rounded text-white hover:bg-gray-600"
        >
          <FontAwesomeIcon icon={edit ? faFloppyDisk : faPenToSquare} />
        </button>
        {edit && (
          <button
            onClick={handleCancel}
            className="text-sm px-3 py-1 bg-red-500 rounded text-white hover:bg-red-600"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      </div>
    </li>
  );
};

export default PasswordItem;
