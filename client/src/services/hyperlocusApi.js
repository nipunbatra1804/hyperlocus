import axios from "axios";
import { hosts, isValidHost } from "./hosts";

const host = window.location.host;
const protocol = window.location.protocol;
const url = isValidHost(host)
  ? `${protocol}//${hosts[window.location.host]}`
  : "";
console.log(url);
const hyperlocusApi = axios.create({
  baseURL: url,
  withCredentials: true
});

export default hyperlocusApi;
