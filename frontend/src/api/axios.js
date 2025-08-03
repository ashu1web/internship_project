import axios from 'axios'

const BASE_URL=import.meta.env.MODE==="development"? "http://localhost:5001/api":"/api"

const axiosInstance=axios.create({
    baseURL:BASE_URL,
    withCredentials:true,
})

export default axiosInstance;

/*
import axios from 'axios';

const Base_URL=import.meta.env.MODE==="development"? "http://localhost:5001/api" :"/api"

const axiosInstance = axios.create({
  baseURL: Base_URL,
  withCredentials: true,
});

export default axiosInstance;



const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api',
  withCredentials: true,
});

export default axiosInstance;
*/