import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <ToastContainer position="top-center" autoClose={2000} />
      <Header />
      <main className="flex items-center justify-center p-6">
        <Outlet />
      </main>
    </div>
  );
}
export default App;
