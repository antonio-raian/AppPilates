import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://192.168.0.103:3333",
  headers: {
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

export default api;
