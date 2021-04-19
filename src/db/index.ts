import express from 'express';
import './core';
import { Op } from 'sequelize';
import morgan from 'morgan';
import { Restaurant, OpeningTime, User, Collection, RestaurantCollection } from './core/models';

const app = express();
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] \
":method :url HTTP/:http-version" :status :res[content-length] \
":referrer" ":user-agent" :total-time ms'
  )
);

app.use('/core/CMD_GET_RESTAURANTS_BY_NAME', async (req, res) => {
  const result = await Restaurant.findAndCountAll({
    where: {
      name: { [Op.substring]: req.query.name },
    },
    include: OpeningTime,
  });
  return res.send(result);
});

app.use('/core/CMD_GET_RESTAURANTS_BY_NAME_AND_DATE_AND_TIME', async (req, res) => {
  const result = await Restaurant.findAndCountAll({
    where: {
      name: { [Op.substring]: req.query.name },
    },
    include: {
      model: OpeningTime,
      where: {
        day: { [Op.eq]: parseInt(req.query.day as string) },
        start: { [Op.lte]: parseInt(req.query.time as string) },
        end: { [Op.gte]: parseInt(req.query.time as string) },
      },
    },
  });
  return res.send(result);
});

app.use('/core/CMD_UPSERT_RESTAURANT', async (req, res) => {
  const { name } = req.query;
  const result = await Restaurant.findOrCreate({ where: { name } });
  return res.send(result);
});

app.use('/core/CMD_GET_OPENING_TIME', async (req, res) => {
  const { name } = req.query;
  const rst = await OpeningTime.findAndCountAll({
    where: { restaurantName: name },
  });
  return res.send(rst);
});

app.use('/core/CMD_SET_OPENING_TIME', async (req, res) => {
  const { startMinutes, endMinutes, name, day } = req.query;
  const rstRcd = await Restaurant.findAll({ where: { name } });
  if (rstRcd.length > 1) {
    return res.status(402).send({ error: 'More than one record of Restaurant found', rstRcd });
  }
  if (rstRcd.length === 0) {
    return res.status(402).send({ error: 'No records of Restaurant', name });
  }
  const otRcd = await OpeningTime.create({
    start: startMinutes,
    end: endMinutes,
    day: day,
    RestaurantId: rstRcd[0].get('id'),
  });
  return res.send(otRcd);
});

app.use('/accounts/CMD_GET_ACCOUNT', async (req, res) => {
  const { username } = req.query;

  const accRcd = await User.findOne({
    where: {
      username,
    },
  });
  if (accRcd) {
    return res.send(accRcd);
  }
  return res.send({ err: -1 });
});

app.use('/accounts/CMD_REGISTER_ACCOUNT', async (req, res) => {
  const { username, firstName, lastName } = req.query;

  const accRcd = await User.create({
    username,
    firstName,
    lastName,
  });
  if (accRcd) {
    return res.send(accRcd);
  }
  return res.send({ err: -1, err_msg: 'Failed to create user' });
});

app.use('/core/CMD_GET_USER_COLLECTIONS', async (req, res) => {
  const { userId } = req.query;

  const accRcd = await Collection.findAndCountAll({
    where: {
      ownerId: userId,
    },
    include: {
      model: Restaurant,
    },
  });
  if (accRcd) {
    return res.send(accRcd);
  }
  return res.send({ err: -1 });
});

app.use('/core/CMD_ADD_USER_COLLECTIONS', async (req, res) => {
  const { colId, rstId } = req.query;
  console.log({ query: req.query });

  const checkRcd = await RestaurantCollection.findOne({
    where: {
      CollectionId: { [Op.eq]: colId },
      RestaurantId: { [Op.eq]: rstId },
    },
  });

  if (checkRcd) {
    console.log({ checkRcd });
    return res.status(400).send({ err: -1, error_msg: 'Already have collection' });
  }

  const accRcd = await RestaurantCollection.create({
    CollectionId: colId,
    RestaurantId: rstId,
  }).catch(e => e);
  console.log({ accRcd });
  if (accRcd) {
    return res.send(accRcd);
  }
  return res.send({ err: -1 });
});

app.use('/core/CMD_CREATE_USER_COLLECTIONS', async (req, res) => {
  const { userId, name } = req.query;

  const accRcd = await Collection.create({
    name: name,
    ownerId: userId,
  });

  if (accRcd) {
    return res.send(accRcd);
  }
  return res.send({ err: -1 });
});

// app.use('/core/CMD_DELETE_USER_COLLECTIONS', async (req, res) => {
//   const { userId } = req.query;

//   const accRcd = await Collection.findAndCountAll({
//     where: {
//       ownerId: userId,
//     },
//   });
//   if (accRcd) {
//     return res.send(accRcd);
//   }
//   return res.send({ err: -1 });
// });

app.listen(8082);
console.log('DB start!');
