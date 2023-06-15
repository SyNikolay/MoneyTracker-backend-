import { Category, Outlay } from '../models/models.js';

class OutlayController {
  async getAll(req, res) {
    const { userId } = req.body;
    const outlays = await Outlay.findAll({ where: { userId } });
    return res.json(outlays);
  }

  async delete(req, res) {
    const { name, userId } = req.body;
    const category = await Category.findOne({ where: { name: name, userId: userId } });
    const outlay = await Outlay.findOne({ where: { name: name, userId: userId } });
    const updBallance = category.balance - outlay.balance;
    8;
    await category.update({ balance: updBallance });
    outlay.destroy();

    return res.json({
      message: 'success',
    });
  }
}

export default new OutlayController();
