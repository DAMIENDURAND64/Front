import User from "@/components/User";
import { useAuth } from "@/context/UserContext";
import React from "react";

function Users() {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <div>Unauthorized</div>;
  }
  return <User />;
}

export default Users;
