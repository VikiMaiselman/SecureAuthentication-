import axios from "axios";

import { URL, HEADERS } from "./config.js";

export function composeDataForBackend(userData, activeTab) {
  return {
    ...userData,
    username: userData.email,
    phone: `+${userData.phone}`,
    action: `${activeTab === 0 ? "signup" : "login"}`,
  };
}

export async function signup(data) {
  console.log(data);
  try {
    const result = await axios.post(`${URL}/sign-up`, data, { withCredentials: true }, HEADERS);
    return result.data;

    // if (data) {
    //     const result = await axios.post(`${URL}/verification`, data, { withCredentials: true }, HEADERS);
    // }
  } catch (error) {
    console.error("from signup".error);
  }
}

export async function verify(fullData) {
  try {
    const result = await axios.post(`${URL}/verification`, fullData, { withCredentials: true }, HEADERS);
    console.log(result);
    return result.data;
  } catch (error) {
    console.error("from login", error);
  }
}

export async function logout() {
  try {
    await axios.get(`${URL}/logout`, { withCredentials: true }, HEADERS);
  } catch (error) {
    console.error(error);
  }
}

export async function checkAuthStatus() {
  try {
    const result = await axios.get(`${URL}/auth-status`, { withCredentials: true }, HEADERS);
    return result.data;
  } catch (error) {
    console.error(error);
  }
}
