import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-type': 'application/json' }
});

export default instance;
