import { useAuth } from "@/context/UserContext";
import Image from "next/image";
import React from "react";

const NavBar = () => {
  const { signOut } = useAuth();
  return (
    <div className="bg-blueStrateg_in h-20 p-4 flex">
      <div className="flex items-center justify-between w-full h-full">
        <p className="text-white text-3xl font-semibold">Strateg.in</p>
        <Image
          src="/logout1.webp"
          alt="logo for logout"
          width={50}
          height={50}
          onClick={() => signOut()}
        />
      </div>
    </div>
  );
};

export default NavBar;
