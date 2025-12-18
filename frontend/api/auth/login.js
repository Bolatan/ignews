import jwt from 'jsonwebtoken';
import { connectToDb } from '../lib/mongodb';

const ADMIN_USER = {
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD
};

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (!ADMIN_USER.username || !ADMIN_USER.password || !JWT_SECRET) {
    console.error('Missing required environment variables for authentication');
    return res.status(500).json({ error: 'Internal Server Error: Auth not configured' });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const isConnected = await connectToDb();
  if (!isConnected) {
    return res.status(503).json({ error: 'Service Unavailable' });
  }

  const { username, password } = req.body;

  if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
    const token = jwt.sign({ username: ADMIN_USER.username, isAdmin: true }, JWT_SECRET, {
      expiresIn: '1h'
    });
    return res.status(200).json({ token });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
}
