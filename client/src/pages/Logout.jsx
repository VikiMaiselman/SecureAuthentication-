import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Authentication.context";

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

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
