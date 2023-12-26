import express from 'express';
import dot from 'dotenv';
import { fileURLToPath } from 'url';
import path from "path";
import sequelize from './db.js';
import { User, Category, Outlay } from './models/models.js';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import router from './routes/index.js';
import { errorHandler } from './middleware/ErrorHandlingMiddleware.js';

dot.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5001;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/', router);
app.use(errorHandler);

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
