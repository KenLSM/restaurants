import fetch from 'node-fetch';

import { CORE_BASE_URL } from '../Constants';
import { withUserAuth } from './utils';

export default app => {
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
};
