import React from "react";
import Swal from "sweetalert2";

import { checkAuthStatus, signUp, logOut, verifyUser, getUserBalance } from "../util/helpers";
import { middleBlue, darkBlue } from "../global-styles/Colors";

const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = React.useState({
    username: "",
    isAuthenticated: "",
    isBeingVerified: "",
    id: ",",
  });
  const [balance, setBalance] = React.useState();

  const checkStatus = async () => {
    try {
      const result = await checkAuthStatus();
      console.log(result);
      setUser((prevSt) => {
        return {
          ...prevSt,
          isAuthenticated: result.isAuthenticated,
          username: result.user ? result.user.username : "",
          id: result.user ? result.user._id : "",
        };
      });
      setBalance(() => {
        return result.user ? result.user.balance : "";
      });
    } catch (error) {
      Swal.fire({
        title: "Ooops...",
        text: "We could not check your authentication status.",
        icon: "error",
        confirmButtonText: "Please, try again.",
        confirmButtonColor: middleBlue,
        color: darkBlue,
        iconColor: "red",
      });
    }
  };

  React.useEffect(() => {
    const updUserStatus = async () => {
      try {
        await checkStatus();
      } catch (error) {
        console.error(error);
      }
    };
    updUserStatus();
  }, []);

  const checkBalance = () => {
    return balance;
  };

  const updateBalance = async () => {
    try {
      const newBalance = await getUserBalance();
      setBalance(() => newBalance);
    } catch (error) {
      console.log(error);
    }
  };

  const isBeingVerified = (status) => {
    setUser((prevSt) => {
      return { ...prevSt, isBeingVerified: status === "pending" };
    });
  };

  const isApproved = (status) => {
    setUser((prevSt) => {
      return { ...prevSt, isAuthenticated: status === "approved", isBeingVerified: false };
    });
  };

  const signup = async (data) => {
    try {
      return await signUp(data);
    } catch (error) {
      Swal.fire({
        title: "Ooops...",
        text: error.response.data.message || error.response.data,
        icon: "error",
        confirmButtonText: "Please, try again.",
        confirmButtonColor: middleBlue,
        color: darkBlue,
        iconColor: "red",
      });
    }
  };

  const verify = async (fullData) => {
    try {
      return await verifyUser(fullData);
    } catch (error) {
      Swal.fire({
        title: "Ooops...",
        text: error.response.data,
        icon: "error",
        confirmButtonText: "Please, try again.",
        confirmButtonColor: middleBlue,
        color: darkBlue,
        iconColor: "red",
      });
    }
  };

  const logout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Ooops...",
        text: "We could not log you out.",
        icon: "error",
        confirmButtonText: "Please, return to home page and try again.",
        confirmButtonColor: middleBlue,
        color: darkBlue,
        iconColor: "red",
      });
    }

    setUser((prevSt) => {
      return { ...prevSt, isAuthenticated: false };
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, checkStatus, balance, updateBalance, isBeingVerified, isApproved, signup, verify, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}
