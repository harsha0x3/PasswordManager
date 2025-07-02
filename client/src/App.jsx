import "./App.css";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import PasswordForm from "./components/PasswordForm";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <Header />
      <Outlet />
    </>
  );
}

export default App;
