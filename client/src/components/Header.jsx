import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCredentials } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      toast.success("USer Logged out");
      navigate("/");
    } catch (error) {
      toast.error(error.data?.msg || "Login failed");
    }
  };

  return (
    <header className="bg-blue-700 text-white flex justify-between items-center px-6 py-3 shadow">
      <h1 className="text-2xl font-bold">🔐 Password Wallet</h1>
      <button
        onClick={handleLogout}
        className="bg-white text-blue-700 px-4 py-2 rounded hover:bg-gray-200"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
