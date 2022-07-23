const Axios = require("axios").default;

Axios.defaults.baseURL = "http://localhost:4200";
Axios.defaults.timeout = 6000;

const setRequestConfig = (queryParams) => {
  const token = localStorage.getItem('Token');
  let config = {
    params: {}
  };
  if (token){
    if(!config.headers) config.headers =  {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  if(queryParams){
    config.params = queryParams
  }
  return config
};

export const GET = async (url, queryParams = null) => {
  return await Axios.get(url, { ...setRequestConfig(queryParams) });
};

export const POST = async (url, data = null, queryParams = null) => {
  return await Axios.post(url, data, { ...setRequestConfig(queryParams) });
};

export const DELETE = async (url, queryParams = null) => {
  return await Axios.delete(url, { ...setRequestConfig(queryParams) });
};

export const PUT = async (url, data = null, queryParams = null) => {
  return await Axios.put(url, data, { ...setRequestConfig(queryParams) });
};