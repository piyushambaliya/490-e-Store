import jwt from 'jsonwebtoken';

const protect = async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;

  if (authHeader) {
    // Accept both "Bearer <token>" and raw token formats
    token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'abc_123_xyz');
      req.user = decoded;
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  return res.status(401).json({ message: 'Not authorized, no token' });
};

export { protect };
