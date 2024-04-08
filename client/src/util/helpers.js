import axios from "axios";

import { URL, HEADERS } from "./config.js";
import Swal from "sweetalert2";
import { darkBlue, middleBlue } from "../global-styles/Colors.js";

export function composeDataForBackend(userData, activeTab, useTwilio = true) {
  return {
    ...userData,
    username: userData.email,
    phone: `+${userData.phone}`,
    action: `${activeTab === 0 ? "signup" : "login"}`,
    useTwilio: useTwilio,
  };
}

export function getDateLabel(transactionDate) {
  const calcDaysPassed = (date1, date2) => Math.trunc(Math.abs(date2 - date1) / (24 * 3600 * 1000));
  const daysPassed = calcDaysPassed(new Date(), transactionDate);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  return `${daysPassed.getDate()}`.padStart(2, 0);
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

export async function getTransactions() {
  try {
    const result = await axios.get(`${URL}/transactions`, { withCredentials: true }, HEADERS);
    console.log(result.data);
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

export async function createTransaction(txData) {
  try {
    const result = await axios.post(`${URL}/transactions`, txData, { withCredentials: true }, HEADERS);
    Swal.fire({
      title: "Success!",
      text: result.data,
      icon: "success",
      confirmButtonText: "Okay",
      confirmButtonColor: middleBlue,
      color: darkBlue,
    });

    await getTransactions();
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

export async function getUserBalance() {
  try {
    const result = await axios.get(`${URL}/balance`, { withCredentials: true }, HEADERS);
    return result.data.balance;
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
