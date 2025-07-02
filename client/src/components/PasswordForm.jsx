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

// Keep your imports as-is

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
  const [generate] = useGenerateMutation();
  const [generateNsave] = useGenerateNSaveMutation();
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse(null);
    try {
      const res = userInfo?.email
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
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto my-6 bg-white/10 backdrop-blur-md p-6 rounded-xl shadow"
    >
      <div className="flex flex-col gap-4">
        <label className="flex flex-col">
          <span className="text-sm text-gray-100">Account Name</span>
          <input
            type="text"
            value={account}
            placeholder="e.g. Gmail"
            onChange={(e) => dispatch(setAccountInfo(e.target.value))}
            className="rounded border border-gray-400 px-3 py-2 bg-white/20 text-white"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm text-gray-100">Custom Password</span>
          <input
            type="text"
            value={password}
            placeholder="Leave empty to auto-generate"
            onChange={(e) => dispatch(setPassword(e.target.value))}
            className="rounded border border-gray-400 px-3 py-2 bg-white/20 text-white"
          />
        </label>

        <div className="text-sm text-gray-100">
          <label className="block mb-2">
            Length: {length}
            <input
              type="range"
              min={6}
              max={33}
              value={length}
              onChange={(e) => dispatch(setLength(Number(e.target.value)))}
              className="w-full mt-1"
            />
          </label>

          {[
            ["Numbers", includeNums, toggleNums],
            ["Mixed Case", includeUpperCase, toggleUpperCase],
            ["Special Characters", includeSpecialChars, toggleSpecialChars],
            ["Save", save, toggleSave],
          ].map(([label, checked, toggle]) => (
            <label key={label} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => dispatch(toggle())}
              />
              {label}
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="mt-4 bg-gray-700 text-white py-2 rounded hover:bg-gray-600"
        >
          Generate
        </button>
      </div>

      {response && (
        <div className="mt-4">
          <PasswordItem passwordData={response} />
        </div>
      )}
    </form>
  );
}

export default PasswordForm;
