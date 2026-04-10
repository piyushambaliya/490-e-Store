import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'abc_123_xyz', {
    expiresIn: '30d',
  });
};

export default generateToken;
