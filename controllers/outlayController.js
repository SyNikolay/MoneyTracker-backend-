import { Category, Outlay, User } from '../models/models.js';
import { generateJwt } from '../utils/generateJwt.js';

class OutlayController {
  async getAll(req, res) {
    const { userId } = req.body;
    const outlays = await Outlay.findAll({ where: { userId } });

    let sumOutlays = 0;

    outlays.forEach((el) => (sumOutlays = sumOutlays + el.balance));

    return res.json({ outlays, sumOutlays });
  }

  async delete(req, res) {
    const { name, userId } = req.body;

    const user = await User.findOne({ where: { id: userId } })
    const category = await Category.findOne({ where: { name: name, userId: userId } });
    const outlay = await Outlay.findOne({ where: { name: name, userId: userId } });

    const updBallance = category.balance - outlay.balance;
    const updUserBallance = user.ballance + outlay.balance;

    await category.update({ balance: updBallance });
    await user.update({ ballance: updUserBallance });
    
    outlay.destroy();

    const token = generateJwt(user);

    return res.json({ token });
  }
}

export default new OutlayController();
