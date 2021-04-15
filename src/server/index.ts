import express from 'express';
import morgan from 'morgan';
import routes from './routes';

const PORT = 8081;

const app = express();

app.use(morgan('combined'));

routes(app);

app.listen(PORT);
console.log('App started on', PORT, '!');
