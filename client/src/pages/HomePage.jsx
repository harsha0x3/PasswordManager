import PasswordForm from "../components/PasswordForm";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <PasswordForm />
      <Outlet />
    </div>
  );
};

export default HomePage;
