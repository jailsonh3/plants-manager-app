import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://192.168.18.8:3333'
  baseURL: 'https://api.npoint.io/4fc7672e60937a2716cb'
});

export default api;
