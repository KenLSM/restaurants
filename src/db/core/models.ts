import { DataTypes, Sequelize, Model } from "sequelize";
import { idText } from "typescript";

export class Restaurant extends Model { }

export class OpeningTime extends Model { }

const initializeModels = async (sequelize: Sequelize) => {
    // const restaurants = await Restaurant.findAll();
    // console.log(JSON.stringify(restaurants, null, 2));

    // const openingTimes = await OpeningTime.findAll();
}

const initialize = async (sequelize: Sequelize) => {
    Restaurant.init({
        name: DataTypes.STRING,
    }, { sequelize, modelName: 'Restaurant' });
    OpeningTime.init({
        day: DataTypes.TINYINT,
        start: DataTypes.SMALLINT, // 60 * 24 = 1440, 2^16=  65536
        end: DataTypes.SMALLINT,
        restId: {
            type: DataTypes.INTEGER,
            references: {
                model: Restaurant,
                key: 'id',
            }
        }
    }, { sequelize, modelName: 'OpeningTime' });

    initializeModels(sequelize);
    await sequelize.sync();
}

export default initialize