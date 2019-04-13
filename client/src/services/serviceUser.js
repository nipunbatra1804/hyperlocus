import axios from "axios";
const inDev = process.env.NODE_ENV !== "production";

const hyperlocusApi = axios.create({
  baseURL: inDev
    ? "http://localhost:4000"
    : "http://hyperlocus-server.herokuapp.com",
  withCredentials: true
});

export async function postLogin(username, password) {
  try {
    const res = await hyperlocusApi.post("/auth/login", {
      username: username,
      password: password
    });
    return res;
  } catch (err) {
    console.error(err);
  }
}
