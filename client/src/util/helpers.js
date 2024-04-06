import axios from "axios";

import { URL, HEADERS } from "./config.js";

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
    await axios.get(`${url}/logout`, { withCredentials: true }, headers);
  } catch (error) {
    console.error(error);
  }
  setIsAuthenticated(false);
}
