import { Category, Outlay } from '../models/models.js';

class OutlayController {
  async getAll(req, res) {
    const outlays = await Outlay.findAll();
    return res.json(outlays);
  }

  async delete(req, res) {
    const { name } = req.body;
    const category = await Category.findOne({ where: { name: name } });
    const outlay = await Outlay.findOne({ where: { name: name } });
    const updBallance = category.balance - outlay.balance;
    
    await category.update({balance: updBallance});
    outlay.destroy();
    
    return res.json({
      message: 'success',
    })
  }
}

export default new OutlayController()