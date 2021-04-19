import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';

import { ACCOUNT_BASE_URL, TOKEN_KEY, ACCESS_KEY, USERNAME_KEY, USER_ID_KEY } from '../Constants';
import { withUserAuth } from './utils';

export default app => {
  app.get('/api/user/register', async (req, res) => {
    const { query } = req;
    const username = query.username as string;
    const firstName = (query.firstName as string) || username; // no time do
    const lastName = (query.lastName as string) || username; // no time do
    const queryParams = new URLSearchParams({
      username,
      firstName,
      lastName,
    });

    if (!username || !firstName || !lastName) {
      return res.status(400).json(query);
    }

    const response = await fetch(
      ACCOUNT_BASE_URL + '/CMD_REGISTER_ACCOUNT?' + queryParams
    ).then(d => d.json());

    if (response?.err) {
      return res.status(400).json(response);
    }
    return res.json(response);
  });

  app.get('/api/user/login', async (req, res) => {
    const { query } = req;
    const username = query.username as string;

    if (username) {
      const response = await fetch(
        ACCOUNT_BASE_URL + `/CMD_GET_ACCOUNT?username=${username}`
      ).then(d => d.json());
      const token = jwt.sign({ username: response.username, userid: response.id }, ACCESS_KEY);
      console.log({ response });
      res.cookie(TOKEN_KEY, token);
      res.cookie(USERNAME_KEY, response.username);
      res.cookie(USER_ID_KEY, response.id);
      return res.json(response);
    }
    return res.json({ query });
  });

  app.get('/api/user', withUserAuth, async (req, res) => {
    // @ts-ignore
    const { username } = req.user;
    console.log('passed!');
    if (username) {
      const response = await fetch(ACCOUNT_BASE_URL + `/CMD_GET_ACCOUNT?username=${username}`);
      return res.json(await response.json());
    }
    return res.json({ err: '??' });
  });
};
