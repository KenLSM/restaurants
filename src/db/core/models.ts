import { DataTypes, Sequelize, Model } from 'sequelize';
import { idText } from 'typescript';

export class Restaurant extends Model {}

export class OpeningTime extends Model {}

const initializeModels = async (sequelize: Sequelize) => {
  // const restaurants = await Restaurant.findAll();
  // console.log(JSON.stringify(restaurants, null, 2));
  // const openingTimes = await OpeningTime.findAll();
};

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

  OpeningTime.belongsTo(Restaurant);
  Restaurant.hasMany(OpeningTime);
  initializeModels(sequelize);
  await sequelize.sync();
};

export default initialize;
