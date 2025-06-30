import "./App.css";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import PasswordForm from "./components/PasswordForm";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
