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
    const user = await User.create({ email, role, password: hasPassword });
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
    const user = req.user;
    const token = generateJwt(user);

    return res.json({ token });
  }
}

export default new UserController();
