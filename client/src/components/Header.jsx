import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { clearCredentials } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/userApiSlice";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await logout().unwrap();
      console.log("Logout");
      console.log(res);
      dispatch(clearCredentials());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex bg-blue-700 justify-between">
      <h1>Password Wallet</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;
