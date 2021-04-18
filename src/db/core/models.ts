import { DataTypes, Sequelize, Model } from 'sequelize';

// import { User } from '../accounts/models';
export class Restaurant extends Model {}
export class OpeningTime extends Model {}
export class Collection extends Model {}
export class User extends Model {}
export class Friends extends Model {}

const initialize = async (sequelize: Sequelize) => {
  Restaurant.init(
    {
      name: { type: DataTypes.STRING, unique: true, allowNull: false },
    },
    { sequelize, modelName: 'Restaurant' }
  );
  OpeningTime.init(
    {
      day: DataTypes.TINYINT,
      start: DataTypes.SMALLINT, // 60 * 24 = 1440, 2^16=  65536
      end: DataTypes.SMALLINT,
    },
    { sequelize, modelName: 'OpeningTime' }
  );
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      username: { type: DataTypes.STRING, unique: true, allowNull: false },
    },
    { sequelize, modelName: 'User' }
  );

  Collection.init(
    {
      name: DataTypes.STRING,
    },
    { sequelize, modelName: 'Collection' }
  );

  OpeningTime.belongsTo(Restaurant);
  Restaurant.hasMany(OpeningTime);

  Collection.belongsTo(Restaurant);
  Collection.belongsTo(User, { as: 'owner' });

  await sequelize.sync();
};

export default initialize;
