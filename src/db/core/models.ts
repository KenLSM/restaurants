import { DataTypes, Sequelize, Model } from 'sequelize';

// import { User } from '../accounts/models';
export class Restaurant extends Model {}
export class OpeningTime extends Model {}

export class Collection extends Model {}
export class CollectionRelation extends Model {}
export class RestaurantCollection extends Model {}

export class User extends Model {}

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
  CollectionRelation.init(
    {
      type: DataTypes.STRING,
    },
    { sequelize, modelName: 'CollectionRelation' }
  );
  RestaurantCollection.init({}, { sequelize, modelName: 'RestaurantCollection' });

  OpeningTime.belongsTo(Restaurant);
  Restaurant.hasMany(OpeningTime);

  User.hasMany(Collection, { constraints: false });
  Collection.belongsTo(User, { as: 'owner' });

  Collection.hasMany(RestaurantCollection, { constraints: false });
  RestaurantCollection.hasOne(Collection, { constraints: false });

  CollectionRelation.hasOne(User);
  User.hasMany(CollectionRelation, { constraints: false });

  Collection.belongsToMany(Restaurant, { through: RestaurantCollection });
  Restaurant.belongsToMany(Collection, { through: RestaurantCollection });

  await sequelize.sync();
};

export default initialize;
