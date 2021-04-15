import { Sequelize } from 'sequelize';
import path from 'path';
import models from './models';

const CoreDbStore = path.resolve(__dirname, 'stores', 'core.sqlite');
const sequelize = new Sequelize({ dialect: 'sqlite', storage: CoreDbStore });

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
