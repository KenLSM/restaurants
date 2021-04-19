import fetch from 'node-fetch';
import { CORE_BASE_URL } from '../Constants';

export default app => {
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
};
