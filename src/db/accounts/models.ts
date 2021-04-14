import { DataTypes, Sequelize } from "sequelize";

export let User: Sequelize['models'][0];
const initializeModels = async (sequelize: Sequelize) => {
    const users = await User.findAll();
    console.log(JSON.stringify(users, null, 2));
    if (users.length <= 0) {
        User.create({
            firstName: "John",
            lastName: "Doe",
        })
    }
}
const initialize = async (sequelize: Sequelize) => {
    sequelize.define('User', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
    })
    User = sequelize.models.User;
    initializeModels(sequelize);
    await sequelize.sync();
}

export default initialize;
