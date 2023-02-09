import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import Link from "next/link";

type TUser = {
  lastName: string;
  firstName: string;
  email: string;
  id: string;
};

function User() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosInstance.get<TUser[]>(
        "http://localhost:4000/api/v1/users"
      );
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>No data</div>;

  if (error) return <div>An error has occurred</div>;
  console.log(data);
  return (
    <div>
      <Link href={"/"} className="ml-4">
        <button className="bg-blueStrateg_in text-white font-bold px-4 py-1 rounded-full w-fit mt-10">
          Home
        </button>
      </Link>
      <div className="w-full flex justify-center p-4">
        <div className="text-black flex flex-col space-y-2">
          {data.map((user) => (
            <div
              key={user.id}
              className="border border-blueStrateg_in bg-white w-fit px-4 rounded-lg flex space-x-2 "
            >
              <p>{user.firstName}</p>
              <p>{user.lastName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default User;
