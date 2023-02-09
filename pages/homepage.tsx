import React, { useEffect, useState } from "react";
import Router from "next/router";

function getTokenFromStorage() {
  return window.localStorage.getItem("token");
}

const Homepage = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = getTokenFromStorage();
    if (token) {
      setLoggedIn(true);
    } else {
      Router.push("/");
    }
  }, []);

  if (!loggedIn) {
    return null;
  }

  return (
    <div>
      <h1>Welcome to the index page</h1>
    </div>
  );
};

export default Homepage;
