import express from "express";
import './core';

// import routes from "./routes";

const app = express();

// routes(app);

app.use('/core/CMD_GET_RESTAURANTS_BY_NAME', (req, res) => {
    return res.send('');
})

app.listen(8082);
console.log('DB start!');