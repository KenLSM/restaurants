import { Express } from 'express';

export default (app: Express) => {
  app.get('/api/search', (req, res) => {
    const { query } = req;
    const { restaurants, time } = query;
    if (query.restaurants) {
    }
    return res.json({ query });
  });

  app.get('/', (req, res) => res.send('hello world'));

  console.log('Loaded routes!');
};
