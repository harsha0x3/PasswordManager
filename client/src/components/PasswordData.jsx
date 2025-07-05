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
      {!data && <p>No PAsswords Saved</p>}
      <ul className="max-h-[500px] overflow-y-auto">
        {data?.passwords.map((item) => (
          <div
            key={item._id}
            className="border border-black m-3 p-4 bg-white/10 rounded-md"
          >
            <PasswordItem passwordData={item} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default PasswordData;
