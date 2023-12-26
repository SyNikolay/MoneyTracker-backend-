import jwt from 'jsonwebtoken';

export const generateJwt = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      ballance: user.ballance,
      avatar: user.avatar,
      name: user.name,
      surname: user.surname,
      salary: user.salary,
      work: user.work,
    },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  );
};