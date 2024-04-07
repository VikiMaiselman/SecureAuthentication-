import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { checkAuthStatus } from "../util/helpers";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = React.useState();

  useEffect(() => {
    const checkStatus = async () => {
      let isAuth;
      try {
        isAuth = await checkAuthStatus();
      } catch (error) {
        console.error(error);
      }

      setIsAuthenticated(() => isAuth);
    };
    checkStatus();
  }, []);
  return (
    <>
      <p>Transactions will be here soon...</p>

      {isAuthenticated && <Link to="/logout">Log Out</Link>}
    </>
  );
}
