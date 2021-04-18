import fetch from 'node-fetch';
import { Express, response } from 'express';

import { CORE_BASE_URL, ACCOUNT_BASE_URL, TOKEN_KEY, ACCESS_KEY, USERNAME_KEY } from '../Constants';
import jwt from 'jsonwebtoken';

export default (app: Express) => {
  app.get('/api/search', async (req, res) => {
    const { query } = req;
    const restaurants = query.restaurants as string;
    const minute = query.minute as string;
    const day = query.day as string;

    if (day) {
      const queryParams = new URLSearchParams({ name: restaurants, day, time: minute }).toString();
      const response = await fetch(
        CORE_BASE_URL + `/CMD_GET_RESTAURANTS_BY_NAME_AND_DATE_AND_TIME?${queryParams}`
      );
      return res.json(await response.json());
    }
    if (restaurants) {
      const response = await fetch(
        CORE_BASE_URL + `/CMD_GET_RESTAURANTS_BY_NAME?name=${query.restaurants}`
      );
      return res.json(await response.json());
    }
    return res.json({ query });
  });

  app.get('/api/user/login', async (req, res) => {
    const { query } = req;
    const username = query.username as string;

    if (username) {
      const response = await fetch(ACCOUNT_BASE_URL + `/CMD_GET_ACCOUNT?username=${username}`);
      const token = jwt.sign({ username }, ACCESS_KEY);
      res.cookie(TOKEN_KEY, token);
      res.cookie(USERNAME_KEY, username);
      return res.json(await response.json());
    }
    return res.json({ query });
  });

  app.get('/api/user', async (req, res) => {
    const { query } = req;
    // const username = query.username as string;
    const tokenValue = req.cookies[TOKEN_KEY];
    const username = req.cookies[USERNAME_KEY];
    const token = jwt.verify(tokenValue, ACCESS_KEY) as { username: string };

    if (token.username !== username) {
      return res.status(403).json({ err: -1, error_msg: 'dunno who you' });
    }
    if (username) {
      const response = await fetch(ACCOUNT_BASE_URL + `/CMD_GET_ACCOUNT?username=${username}`);
      return res.json(await response.json());
    }
    return res.json({ query });
  });

  app.get('/', (req, res) => res.send('hello world'));

  console.log('Loaded routes!');
};
