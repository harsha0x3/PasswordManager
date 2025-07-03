import { useEffect, useState } from "react";
import { useLoginMutation } from "../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.userInfo?.email) {
      navigate("/passwords");
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res.user));
      toast.success(`Logged in as ${res.user.name}`);
    } catch (error) {
      toast.error(error.data?.msg || "Login failed");
    }
  };

  return (
    <div className="border border-black bg-gray-700 max-w-md p-6 rounded-md text-white shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <label className="flex flex-col">
          <span className="mb-1 text-gray-300">E-mail</span>
          <input
            type="email"
            className="border border-gray-300 rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 text-gray-300">Password</span>
          <input
            type="password"
            className="border border-gray-300 rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={isLoading}
        >
          Login
        </button>

        <p className="text-sm text-center">
          New user?{" "}
          <Link to="/register" className="text-blue-600 underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
