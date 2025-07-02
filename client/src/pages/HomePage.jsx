import PasswordForm from "../components/PasswordForm";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white p-6">
      <PasswordForm />
      <Outlet />
    </div>
  );
};

export default HomePage;
