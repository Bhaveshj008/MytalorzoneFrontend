import axios from 'axios';

const api = axios.create({
    baseURL: 'https://ecommercebackend-main.vercel.app/', 
   
    headers: {
      'Content-Type': 'application/json',
    },
  });
export default api;
