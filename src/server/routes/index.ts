import { Express } from 'express';

import userRoutes from './user';
import collectionRoutes from './collection';
import searchRoutes from './search';

export default (app: Express) => {
  userRoutes(app);
  collectionRoutes(app);
  searchRoutes(app);

  app.get('/', (req, res) => res.send('hello world'));

  console.log('Loaded routes!');
};
