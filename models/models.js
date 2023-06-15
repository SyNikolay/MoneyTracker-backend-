import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING },
});

const Category = sequelize.define('category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  balance: { type: DataTypes.INTEGER },
});

const Outlay = sequelize.define('outlay', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  balance: { type: DataTypes.INTEGER },
  comment: { type: DataTypes.STRING },
});

User.hasMany(Category);
Category.belongsTo(User);

User.hasMany(Outlay);
Outlay.belongsTo(User);

export { User, Category, Outlay };
