import { useState } from "react";
import { useRegisterMutation } from "../slices/userApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials(res.user));
      toast.success(res.msg);
      navigate("/passwords");
    } catch (error) {
      console.error(error.data?.msg || error);
      toast.error(error.data?.msg || "Registring failed");
    }
  };

  return (
    <div className="border border-black bg-gray-700 max-w-md p-6 rounded-md text-white shadow-md">
      <h2 className="text-neon-cyan font-cyber text-2xl mb-6 text-center">
        Create Account
      </h2>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <label className="text-neon-pink font-cyber">
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full bg-gray-700/40 border border-gray-600 rounded px-3 py-2 text-white"
            placeholder="Enter Your Name"
            required
          />
        </label>
        <label className="text-neon-pink font-cyber">
          E‑mail
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full bg-gray-700/40 border border-gray-600 rounded px-3 py-2 text-white"
            placeholder="Enter Mail ID"
            required
          />
        </label>
        <label className="text-neon-pink font-cyber">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full bg-gray-700/40 border border-gray-600 rounded px-3 py-2 text-white"
            placeholder="An impregnable one"
            required
          />
        </label>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
        <p>
          Account Exists?{" "}
          <span>
            <Link to="/">Login</Link>
          </span>
        </p>
      </form>
    </div>
  );
}
