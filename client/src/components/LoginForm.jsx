import { useEffect, useState } from "react";
import { useLoginMutation } from "../slices/userApiSlice";
import { useSelector, useDispatch } from "react-redux";
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
    if (userInfo.userInfo && userInfo.userInfo.email) {
      console.log(userInfo.email);
      navigate("/passwords");
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("Submit");

      const res = await login({ email, password }).unwrap();

      dispatch(setCredentials(res.user));
      toast.success(`Logged in as ${res.user.name}`);
    } catch (error) {
      console.log(error);
      console.log(error.data.msg);
      toast.error(error.data.msg);
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">
          E-mail
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          disabled={isLoading}
        >
          "Login"
        </button>
        <div>
          <span>
            New User? <Link to="register">Register</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
