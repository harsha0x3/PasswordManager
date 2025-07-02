import { useGetPasswordsQuery } from "../slices/passwordsApiSlice";
import PasswordItem from "./PasswordItem";
import Loader from "./Loader";

const PasswordData = () => {
  const { data, error, isLoading } = useGetPasswordsQuery();

  if (error) return <p className="text-red-500">Error: {error.message}</p>;
  if (isLoading) return <Loader size="md" />;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-white mb-2">Saved Passwords</h3>
      <ul className="max-h-[400px] overflow-y-auto">
        {data?.passwords.map((item) => (
          <PasswordItem key={item._id} passwordData={item} />
        ))}
      </ul>
    </div>
  );
};

export default PasswordData;
