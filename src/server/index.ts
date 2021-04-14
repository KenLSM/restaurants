import express from "express";
import routes from "./routes";
import morgan from 'morgan';

const PORT = 8081;
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('combined'))


routes(app);

app.listen(PORT);
console.log('App started on', PORT, '!');