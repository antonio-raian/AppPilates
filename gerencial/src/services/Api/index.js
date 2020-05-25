import axios from "axios";
import { URL } from "./url_server";

const api = axios.create({
  baseURL: URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

export default api;
