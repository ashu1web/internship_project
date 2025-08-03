import axios from 'axios';

const Base_URL=import.meta.env.Mode==="development"? "http://localhost:5001/api" :"/api"

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api',
  withCredentials: true,
});

export default axiosInstance;
