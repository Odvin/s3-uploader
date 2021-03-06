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

    console.log(config);

    const { data: responseData = {} } = await axios(config);

    return responseData;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export default authFetch;
