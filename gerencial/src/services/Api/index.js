import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://192.168.0.103:8080",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

export default api;
