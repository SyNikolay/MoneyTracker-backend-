import { Category, Outlay } from '../models/models.js';

class CategoryController {
  async create(req, res, next) {
    const { userId, name, balance, comment } = req.body;
    const caseName = name[0].toUpperCase() + name.slice(1);
    const newCategory = await Category.findOne({ where: { name: caseName, userId: userId } });
    const newOutlay = await Outlay.create({ name: caseName, balance, comment, userId });
    if (newCategory) {
      const updCategory = await newCategory.update({ balance: +newCategory.balance + +balance });
      return res.json(updCategory);
    }
    const category = await Category.create({ name: caseName, balance, userId });
    return res.json(category);
  }

  async delete(req, res) {
    const { name } = req.body;
    const category = await Category.findOne({ where: { name: caseName } });
    category.destroy();

    return res.json({
      message: 'success',
    });
  }

  async getAll(req, res) {
    const { userId } = req.body;
    const categories = await Category.findAll({ where: { userId } });
    return res.json(categories);
  }

  async getAllCategories(req, res) {
    const { userId } = req.body;
    const categories = await Category.findAll({ where: { userId } });
    if (categories.length > 0) {
      const allCategoriesArray = [];
      categories.forEach((el) => allCategoriesArray.push(el.name));

      return res.json(allCategoriesArray);
    }
    return res.json([]);
  }
}

export default new CategoryController();
