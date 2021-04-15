import express from "express";
import './core';
import { Restaurant, OpeningTime } from './core/models';
import { Op } from 'sequelize';
import morgan from "morgan";
import { restart } from "pm2";
// import routes from "./routes";

const app = express();
app.use(morgan(
    ':remote-addr - :remote-user [:date[clf]] \
":method :url HTTP/:http-version" :status :res[content-length] \
":referrer" ":user-agent" :total-time ms'
));

// routes(app);

app.use('/core/CMD_GET_RESTAURANTS_BY_NAME', async (req, res) => {
    const result = await Restaurant.findAndCountAll({
        where: {
            name: { [Op.substring]: req.query.name }
        }
    })
    return res.send(result);
})

app.use('/core/CMD_SET_RESTAURANT', (req, res) => {
    const { name, } = req.query;
    Restaurant.findOrCreate({ where: { name } });
    // OpeningTime.create({

    // }) 
    return res.send();
})

app.use('/core/CMD_GET_OPENING_TIME', async (req, res) => {
    const { name } = req.query;
    const rst = await OpeningTime.findAndCountAll({
        where: { restaurantName: name }
    })
    return res.send(rst);
})

app.use('/core/CMD_SET_OPENING_TIME', async (req, res) => {
    const { startMinutes, endMinutes, name } = req.query;
    const rst = await Restaurant.findAll({ where: { name } });
    if (rst.length > 1) { return res.status(402).send({ error: 'More than one record of Restaurant found', rst }) }
    if (rst.length == 0) { return res.status(402).send({ error: 'No records of Restaurant', name }) }
    await OpeningTime.create({
        start: startMinutes, end: endMinutes,
        restaurantName: rst[0].getDataValue('name')
    })
    return res.send('Ok?')
})

app.listen(8082);
console.log('DB start!');