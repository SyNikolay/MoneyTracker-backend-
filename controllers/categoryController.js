import { Category, Outlay } from '../models/models.js';

class CategoryController {
  async create(req, res, next) {
    const {name, balance, comment} = req.body;
    const caseName = name[0].toUpperCase() + name.slice(1);
    const newCategory = await Category.findOne({ where: { name: caseName } });
    const newOutlay = await Outlay.create({ name: caseName, balance, comment });
    if ( newCategory ) {
      const updCategory = await newCategory.update({ balance: +newCategory.balance + +balance });
      return res.json(updCategory);
    };
    const category = await Category.create({ name: caseName, balance });
    return res.json(category);
  }

  async delete(req, res) {
    const { name } = req.body;
    const category = await Category.findOne({ where: { name: caseName } })
    category.destroy();
    
    return res.json({
      message: 'success',
    })
  }

  async getAll(req, res) {
    const categories = await Category.findAll();
    return res.json(categories)
  }

  async getAllCategories(req, res) {
    const categories = await Category.findAll();
    const allCategoriesArray = [];
    categories.forEach(el => allCategoriesArray.push(el.name))
    
    return res.json(allCategoriesArray)
  }
}

export default new CategoryController()