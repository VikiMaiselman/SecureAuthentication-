import axios from "axios";

import { URL, HEADERS } from "./config.js";
import Swal from "sweetalert2";
import { darkBlue, middleBlue } from "../global-styles/Colors.js";

export function composeDataForBackend(userData, activeTab) {
  return {
    ...userData,
    username: userData.email,
    phone: `+${userData.phone}`,
    action: `${activeTab === 0 ? "signup" : "login"}`,
  };
}

export async function signUp(data) {
  try {
    const result = await axios.post(`${URL}/sign-up`, data, { withCredentials: true }, HEADERS);
    return result.data;
  } catch (error) {
    console.error("from signup", error);
    throw error;
  }
}

export async function verifyUser(fullData) {
  try {
    const result = await axios.post(`${URL}/verification`, fullData, { withCredentials: true }, HEADERS);
    return result.data;
  } catch (error) {
    console.error("from login", error);
    throw error;
  }
}

export async function logOut() {
  try {
    await axios.get(`${URL}/logout`, { withCredentials: true }, HEADERS);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function checkAuthStatus() {
  try {
    const result = await axios.get(`${URL}/auth-status`, { withCredentials: true }, HEADERS);
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createTransaction(txData) {
  try {
    const result = await axios.post(`${URL}/transactions`, txData, { withCredentials: true }, HEADERS);
    return result.data;
  } catch (error) {
    console.error(error);
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
}
