import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = (handler) => async (req, res) => {
  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined');
    return res.status(500).json({ error: 'Internal Server Error: Auth not configured' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return handler(req, res);
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
