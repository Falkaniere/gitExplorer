import axios from 'axios';

const api_git = axios.create({
  baseURL: 'http://api.github.com',
});

export default api_git;
