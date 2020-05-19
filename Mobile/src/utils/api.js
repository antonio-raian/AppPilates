import axios from 'axios';
import API_URL from './url';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
});

export default api;
