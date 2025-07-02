import PasswordForm from "../components/PasswordForm";
import PasswordData from "../components/PasswordData";

const PasswordsPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white p-6">
      <PasswordForm />
      <PasswordData />
    </div>
  );
};

export default PasswordsPage;
