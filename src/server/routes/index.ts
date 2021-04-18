import fetch from 'node-fetch';
import { Express, response } from 'express';

import {
  CORE_BASE_URL,
  ACCOUNT_BASE_URL,
  TOKEN_KEY,
  ACCESS_KEY,
  USERNAME_KEY,
  USER_ID_KEY,
} from '../Constants';
import jwt from 'jsonwebtoken';
import { withUserAuth } from './utils';

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

  app.get('/api/user/register', async (req, res) => {
    const { query } = req;
    const username = query.username as string;
    const firstName = query.firstName as string;
    const lastName = query.lastName as string;
    const queryParams = new URLSearchParams({
      username,
      firstName,
      lastName,
    });
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

  app.get('/api/user/collection', withUserAuth, async (req, res) => {
    // @ts-ignore
    const { username, userid } = req.user;
    const response = await fetch(
      CORE_BASE_URL + `/CMD_GET_USER_COLLECTIONS?userId=${userid}`
    ).then(d => d.json());
    console.log(response);
    return res.json(response);
  });

  app.get('/api/user/collection/add', withUserAuth, async (req, res) => {
    // @ts-ignore
    const { username, userid } = req.user;
    const response = await fetch(
      CORE_BASE_URL + `/CMD_GET_USER_COLLECTIONS?userId=${userid}`
    ).then(d => d.json());
    console.log(response);
    return res.json(response);
  });

  app.get('/', (req, res) => res.send('hello world'));

  console.log('Loaded routes!');
};
