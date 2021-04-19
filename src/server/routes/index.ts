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

  app.get('/api/collection/user/get', withUserAuth, async (req, res) => {
    // @ts-ignore
    const { username, userid } = req.user;
    const response = await fetch(
      CORE_BASE_URL + `/CMD_GET_USER_COLLECTIONS?userId=${userid}`
    ).then(d => d.json());
    console.log(response);
    return res.json(response);
  });

  app.get('/api/collection/new', withUserAuth, async (req, res) => {
    // @ts-ignore
    const { userid } = req.user;
    const { query } = req;
    const name = query.name as string;

    const response = await fetch(
      CORE_BASE_URL + `/CMD_CREATE_USER_COLLECTIONS?userId=${userid}&name=${name}`
    ).then(d => d.json());
    console.log(response);
    return res.json(response);
  });

  app.get('/api/collection/add', withUserAuth, async (req, res) => {
    // @ts-ignore
    const { userid } = req.user;
    const { query } = req;
    const rstId = query.rstId as string;
    const colId = query.colId as string;
    // owner check
    const userCollections = await fetch(
      CORE_BASE_URL + `/CMD_GET_USER_COLLECTIONS?userId=${userid}`
    ).then(d => d.json());

    if ((userCollections.rows as Array<any>).some(row => String(row.id) === colId) === false) {
      console.log({ rows: userCollections.rows, colId });
      return res.status(403).json({ err: -1, error_msg: 'not your collection' });
    }
    const response = await fetch(
      CORE_BASE_URL + `/CMD_ADD_USER_COLLECTIONS?rstId=${rstId}&colId=${colId}`
    ).then(d => d.json());
    return res.json(response);
  });

  app.get('/', (req, res) => res.send('hello world'));

  console.log('Loaded routes!');
};
