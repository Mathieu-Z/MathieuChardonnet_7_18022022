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

export const POST = async (url, data = null, queryParams = null, moreHeaders = null) => {
  let headers = { ...setRequestConfig(queryParams) };
  if(moreHeaders){
    headers.push(moreHeaders)
  }
  return await Axios.post(url, data, headers);
};

export const POSTFILE = async (url, data = null) => {
  const api = Axios.create({ baseURL: "http://localhost:4200/"});

  api.interceptors.request.use(async config => {
    const token = localStorage.getItem('Token');
    if (token)
      config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  api.defaults.headers.post["Content-Type"] = "multipart/form-data"

  return api.post(url, data);
  
};

export const DELETE = async (url, queryParams = null) => {
  return await Axios.delete(url, { ...setRequestConfig(queryParams) });
};

export const PUT = async (url, data = null, queryParams = null) => {
  console.log(data);
  return await Axios.put(url, data, { ...setRequestConfig(queryParams) });
};