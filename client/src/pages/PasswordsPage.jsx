import PasswordForm from "../components/PasswordForm";
import PasswordData from "../components/PasswordData";

const PasswordsPage = () => {
  return (
    <div className="flex text-white">
      {/* Left half */}
      <div className="w-1/2 flex items-center justify-center border-r border-gray-700 px-6">
        <PasswordForm />
      </div>

      {/* Right half */}
      <div className="w-1/2 flex items-center justify-center px-6">
        <PasswordData />
      </div>
    </div>
  );
};

export default PasswordsPage;
