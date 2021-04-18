const BASE_URL = false && process?.env.ENV === 'live' ? '' : 'http://localhost:8081';

const fetchApi = url => {
  return fetch(url).catch(e => console.log(e));
};
export const get = (url: string) => {
  return fetchApi(BASE_URL + url).catch(e => console.log({ e }));
};
