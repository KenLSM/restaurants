const BASE_URL = 'http://agrest.kenlsm.com/api';

const fetchApi = url => {
  return fetch(url, {
    credentials: 'include',
  });
};
export const get = (url: string) => {
  return fetchApi(BASE_URL + url);
};
