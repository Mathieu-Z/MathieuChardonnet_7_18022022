const Axios = require("axios").default;

Axios.defaults.baseURL = "http://localhost:4200";
Axios.defaults.timeout = 6000;
//Axios.defaults.withCredentials = true;

const setRequestConfig = (queryParams) => {
    //user: localStorage.getItem('user'),
  const token = localStorage.getItem('Token');
  //headers.append('User', session.user);
  //headers.append('User-Token', session.token);
  let config = {
    params: {}
  };
  if (token){
    if(!config.headers) config.headers =  {};
    config.headers.Authorization = `Bearer ${token}`;
    //console.log(token);
  }
  if(queryParams){
    config.params = queryParams
  }
  //console.log(config)
  return config

  /*const token = require.headers("JWT");
  const source = Axios.CancelToken.source();
  console.log(source.token, queryParams);

  let config = {
    cancelToken: source.token,
    params: {},
  };
  if (queryParams) {
    config.params = queryParams;
  }

  return config;*/
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