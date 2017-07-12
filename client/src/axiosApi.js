import axios from "axios";

// bug https://github.com/mzabriskie/axios/issues/587
// var instance = axios.create({
//   baseURL: process.env.REACT_APP_API_SERVER_BASE + "/",
//   withCredentials: true
// });

export default {
  get(url) {
    return axios.get(`${process.env.REACT_APP_API_SERVER_BASE}${url}`, {
      withCredentials: true
    });
  },
  post(url, data) {
    return axios.post(`${process.env.REACT_APP_API_SERVER_BASE}${url}`, data, {
      withCredentials: true
    });
  }
};
