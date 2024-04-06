import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { logout } from "../util/helpers";

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    const logOut = async () => {
      await logout();
    };
    logOut();
    navigate("/sign-up", { replace: true });
  }, []);

  return <></>;
}
