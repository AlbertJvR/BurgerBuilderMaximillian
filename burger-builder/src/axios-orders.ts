import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-http-87092.firebaseio.com/'
});

export default instance;
