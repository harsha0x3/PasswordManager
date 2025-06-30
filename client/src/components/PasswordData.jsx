import { useState } from "react";
import { useGetPasswordsQuery } from "../slices/passwordsApiSlice";
import PasswordItem from "./PasswordItem";
import Loader from "./Loader";

const PasswordData = () => {
  const { data, error, isLoading } = useGetPasswordsQuery();
  if (error) {
    return <p>Error : {error.message}</p>;
  }
  if (isLoading) {
    return (
      <>
        <p>Loading</p>
        <Loader size="md" />
      </>
    );
  }
  if (data) {
    console.log(data);
  }

  return (
    <div>
      <p>Password Data</p>
      <ul className="border border-white rounded p-4 overflow-y-auto ">
        {data.passwords.map((item) => (
          <PasswordItem key={item._id} passwordData={item} />
        ))}
      </ul>
    </div>
  );
};

export default PasswordData;
