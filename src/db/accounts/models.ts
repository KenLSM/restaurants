import { DataTypes, Sequelize, Model } from 'sequelize';

export class User extends Model {}
export class Friends extends Model {}

const initializeModels = async (sequelize: Sequelize) => {
  const users = await User.findAll();
  console.log(JSON.stringify(users, null, 2));
  if (users.length <= 0) {
    User.create({
      firstName: 'John',
      lastName: 'Doe',
    });
  }
};
const initialize = async (sequelize: Sequelize) => {
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
    },
    { sequelize, modelName: 'User' },
  );

  initializeModels(sequelize);
  await sequelize.sync();
};

export default initialize;
