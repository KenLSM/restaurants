import { Sequelize } from 'sequelize';
import path from 'path';
import models from './models';

const accountsDbStore = path.resolve(__dirname, 'stores', 'accounts.sqlite');
const sequelize = new Sequelize({ dialect: 'sqlite', storage: accountsDbStore });

models(sequelize);

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    console.error('Terminating db.');
    process.exit(1);
  }
}

main();
