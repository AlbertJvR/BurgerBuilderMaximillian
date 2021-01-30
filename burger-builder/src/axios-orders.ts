import axios from 'axios';

const instance = axios.create({
    baseURL: 'Enter your firebase URL Here'
});

export default instance;
