import axios from 'axios';

async function authFetch(url, options) {
  try {
    const {
      method = 'get',
      data = {},
      params = {},
      headers = {},
      auth = true
    } = options;

    const config = {
      url,
      method,
      data,
      params
    };

    if (auth) {
      const token = localStorage.getItem('token');

      if (!token) {
        return (window.location.href = '/');
      }

      config.headers = {
        ...headers,
        authorization: `Bearer: ${token}`
      };
    }

    const { data: resData } = await axios(config);
    return { resData, reqFailed: false };
  } catch (error) {
    console.error(error);
    return { resData: {}, reqFailed: true };
  }
}

export default authFetch;
