import { useAuth } from "@/context/UserContext";
import Link from "next/link";
import React from "react";

const Homepage = () => {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="flex flex-col items-center h-full m-4 ">
      <h1>Welcome to our Website</h1>
      <Link href="/users">
        <button className="bg-blueStrateg_in text-white font-bold px-4 py-1 rounded-full w-fit mt-10">
          Show users
        </button>
      </Link>
    </div>
  );
};

export default Homepage;
