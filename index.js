import express from 'express';
import dot from 'dotenv';
import sequelize from './db.js'
import { User, Category, Outlay } from './models/models.js';
import cors from 'cors';
import router from './routes/index.js';
import { errorHandler } from './middleware/ErrorHandlingMiddleware.js';

dot.config()

const PORT = process.env.PORT || 5001;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router)
app.use(errorHandler)

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Работает на порту ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();