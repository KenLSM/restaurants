import express from 'express';
import morgan from 'morgan';
import routes from './routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const PORT = 8081;

const app = express();
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:8081'], credentials: true }));
app.use(cookieParser());
app.use(morgan('combined'));

routes(app);

app.listen(PORT);
console.log('App started on', PORT, '!');
