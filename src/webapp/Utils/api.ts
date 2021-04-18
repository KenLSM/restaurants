const BASE_URL = false && process?.env.ENV === 'live' ? '' : 'http://localhost:8081/api';

const fetchApi = url => {
  return fetch(url, {
    credentials: 'include',
  });
};
export const get = (url: string) => {
  return fetchApi(BASE_URL + url);
};
