import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    'Access-Control-Allow-Origin': true,
  },
});

export default Api;
