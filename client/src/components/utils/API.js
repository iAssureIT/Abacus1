// utils/API.js

import axios from "axios";

// export default axios.create({
//   baseURL: "http://localhost:3006",
//   responseType: "json"
// });

const API = () => (

axios.defaults.baseURL = 'http://localhost:3006',
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json'

);

export default API;