import axios from "axios";

const apiLocal = axios.create({
  baseURL: "http://localhost:3000",

  headers: {
    "Content-Type": "application/json",
  },
});

apiLocal.interceptors.request.use(
  (config) => {
    
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiLocal;
