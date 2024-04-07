import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { logout } from "../util/helpers";

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    const logOut = async () => {
      try {
        await logout();
      } catch (error) {
        console.error(error);
      }
    };
    logOut();
    navigate("/sign-up", { replace: true });
  }, []);

  return <></>;
}
