import bcrypt from 'bcrypt';
import ApiError from '../error/ApiError.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/models.js';

const generateJwt = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      ballance: user.ballance,
    },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  );
};

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
    const user = await User.create({ email, role, password: hasPassword, ballance: 0 });
    const token = generateJwt(user);

    return res.json({
      token,
      message: 'Пользователь успешно зарегистрирован',
    });
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
