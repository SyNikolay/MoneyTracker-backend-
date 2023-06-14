import { Sequelize } from 'sequelize';
import dot from 'dotenv';

dot.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    native: true,
  },
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

export default sequelize;
