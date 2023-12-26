import { Category, Outlay, User } from '../models/models.js';
import { generateJwt } from '../utils/generateJwt.js';

class CategoryController {
  async create(req, res, next) {
    const { userId, name, balance, comment } = req.body;
    const caseName = name[0].toUpperCase() + name.slice(1);
    const user = await User.findOne({where: { id: userId }})

    const newCategory = await Category.findOne({ where: { name: caseName, userId: userId } });
    const newOutlay = await Outlay.create({ name: caseName, balance, comment, userId });

    if (newCategory) {
      const updCategory = await newCategory.update({ balance: +newCategory.balance + +balance });
    } else {
      const category = await Category.create({ name: caseName, balance, userId });
    }

    await user.update({ballance: +user.ballance - +balance})

    const token = generateJwt(user);

    return res.json({ token });
  }

  async delete(req, res) {
    const { name, userId } = req.body;

    const user = await User.findOne({ where: { id: userId } });
    const category = await Category.findOne({ where: { name, userId } });

    await user.update({ ballance: user.ballance + category.balance })

    category.destroy();

    const outlays = await Outlay.findAll({ where: { name } })
    outlays.forEach(el => el.destroy())

    const categories = await Category.findAll({ where: { userId } });

    return res.json( categories );
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
