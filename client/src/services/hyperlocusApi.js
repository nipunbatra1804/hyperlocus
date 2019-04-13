import axios from "axios";
const inDev = process.env.NODE_ENV !== "production";

const hyperlocusApi = axios.create({
  baseURL: inDev
    ? "http://localhost:4000"
    : "http://hyperlocus-server.herokuapp.com/",
  withCredentials: true
});

export default hyperlocusApi;
