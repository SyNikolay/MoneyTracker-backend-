import bcrypt from 'bcrypt';
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import ApiError from '../error/ApiError.js';
import { User } from '../models/models.js';
import { generateJwt } from '../utils/generateJwt.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest('Некорректный емаил или пароль'));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким email уже существует'));
    }
    const hasPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hasPassword });
    const token = generateJwt(user);

    return res.json({
      token,
      message: 'Пользователь успешно зарегистрирован',
    });
  }

  async update(req, res, next) {
    try {
      const { id, salary, work, name, surname } = req.body;

      const user = await User.findOne({ where: { id: id } });

      if (!!req.files) {
        const { avatar } = req.files
        let fileName = uuidv4() + '.jpg';

        avatar.mv(path.resolve(__dirname, '..', 'static', fileName));
        await user.update({ avatar: fileName });
      }

      salary && await user.update({ salary });
      work && await user.update({ work });
      name && await user.update({ name });
      surname && await user.update({ surname });

      const token = generateJwt(user);

      return res.json({ token });
    } catch (error) {
      next(ApiError.badRequest('Error'))
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.badRequest('Пользователя с таким email не существует'));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.badRequest('Неверный пароль'));
    }
    const token = generateJwt(user);

    return res.json({ token });
  }

  async auth(req, res, next) {
    const { id } = req.body;
    const user = await User.findOne({ where: { id } });
    const token = generateJwt(user);

    return res.json({ token });
  }

  async setBallance(req, res, next) {
    const { id, sum, inc } = req.body;
    const user = await User.findOne({ where: { id } });
    if (user) {
      let updBallance;
      if (inc === '+') {
        updBallance = user.ballance + sum;
      }
      if (inc === '-') {
        updBallance = user.ballance - sum;
      }

      await user.update({ ballance: updBallance });
    }

    return res.json({ ballance: user.ballance });
  }

  async getBallance(req, res, next) {
    const { id } = req.body;
    const user = await User.findOne({ where: { id } });

    return res.json({ ballance: user.ballance });
  }
}

export default new UserController();
