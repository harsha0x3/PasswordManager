import { useState } from "react";
// import PasswordItem from "./PasswordItem";
import {
  setAccountInfo,
  setPassword,
  setLength,
  toggleNums,
  toggleSave,
  toggleSpecialChars,
  toggleUpperCase,
} from "../slices/passwordSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  useGenerateMutation,
  useGenerateNSaveMutation,
} from "../slices/passwordsApiSlice";
import PasswordItem from "./PasswordItem";

function PasswordForm() {
  const {
    account,
    length,
    includeUpperCase,
    includeNums,
    includeSpecialChars,
    save,
    password,
  } = useSelector((state) => state.passwordOptions);

  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const [generate, { isLoading }] = useGenerateMutation();
  const [generateNsave] = useGenerateNSaveMutation();
  const [response, setResponse] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse(null);
    try {
      const res =
        userInfo && userInfo.email
          ? await generateNsave({
              account,
              length,
              includeUpperCase,
              includeNums,
              includeSpecialChars,
              save,
              password,
            }).unwrap()
          : await generate({
              account,
              length,
              includeUpperCase,
              includeNums,
              includeSpecialChars,
              save,
              password,
            }).unwrap();
      setResponse(res.generatedPassword);
    } catch (error) {
      console.log(error.data);
    }
  };

  /**************************************************************/
  return (
    <form onSubmit={handleSubmit} className=" flex flex-col gap-2">
      <div className=" w-full max-w-md shadow-lg shadow-gray-500 border border-white bg-[#41413c]/35 mb-3 rounded-lg p-8">
        <div className="flex flex-col shadow rounded-lg  mb-4 gap-1.5">
          <label htmlFor="accountName" className="text-white ">
            Account Name
            <input
              type="text"
              id="accountName"
              value={account}
              placeholder="Enter Account"
              onChange={(e) => {
                dispatch(setAccountInfo(e.target.value));
              }}
              className="rounded-md border-white bg-gray-100/25"
            />
          </label>

          <label htmlFor="userPassword" className="text-white">
            Password
            <input
              id="userPassword"
              type="text"
              value={password}
              placeholder="Enter Custom Password"
              onChange={(e) => {
                dispatch(setPassword(e.target.value));
              }}
              className="rounded-md border-white bg-gray-100/25"
            />
          </label>
        </div>
        <div className="flex flex-col text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <label htmlFor="length">
              <input
                type="range"
                min={6}
                max={33}
                value={length}
                className="cursor-pointer"
                onChange={(e) => dispatch(setLength(Number(e.target.value)))}
                name=""
                id=""
              />
              length:{length}
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <label htmlFor="number">
              <input
                type="checkbox"
                className="cursor-pointer"
                checked={includeNums}
                onChange={() => {
                  dispatch(toggleNums());
                }}
                name=""
                id="number"
              />
              Number
            </label>
          </div>

          <div className="flex items-center gap-x-1">
            <label htmlFor="mixedcase">
              <input
                type="checkbox"
                className="cursor-pointer"
                checked={includeUpperCase}
                onChange={() => dispatch(toggleUpperCase())}
                name=""
                id="mixedcase"
              />
              Mixed Case
            </label>
          </div>

          <div className="flex items-center gap-x-1">
            <label htmlFor="character">
              <input
                type="checkbox"
                className="cursor-pointer"
                checked={includeSpecialChars}
                onChange={() => dispatch(toggleSpecialChars())}
                name=""
                id="character"
              />
              Characters
            </label>
          </div>

          <div className="flex items-center gap-x-1">
            <label htmlFor="save">
              <input
                type="checkbox"
                className="cursor-pointer"
                checked={save}
                onChange={() => dispatch(toggleSave())}
                name=""
                id="save"
              />
              Save
            </label>
          </div>
        </div>
        <div className="flex justify-center mt-3">
          <button
            type="submit"
            className="bg-[#41413c]/35 rounded-lg px-5 py-2 border border-white hover:shadow-md shadow-gray-700"
          >
            Generate
          </button>
        </div>
      </div>
      {response && <PasswordItem passwordData={response} />}
    </form>
  );
}

export default PasswordForm;
