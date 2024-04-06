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
  } catch (error) {}
}

export async function verify(fullData) {
  try {
    const result = await axios.post(`${URL}/verification`, fullData, { withCredentials: true }, HEADERS);
    return result.data;
  } catch (error) {}
}
