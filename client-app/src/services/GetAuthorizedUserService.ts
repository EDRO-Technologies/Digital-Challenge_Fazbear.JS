import {getToken} from "@/app/api/token";
import authFetch from "@/services/AuthFetchService";

import axios from "axios";

const API_URL = `http://192.168.137.1:3000`;

const api = axios.create({
  baseURL: API_URL, // Замените на вашу базовую URL-адрес
});

api.interceptors.request.use(
  async (config) => {
    const token = getToken()

    
    // Добавьте токен в заголовок Authorization
    if (token) {
      console.log(token.value);
      config.headers.Authorization = `Bearer ${token.value}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;