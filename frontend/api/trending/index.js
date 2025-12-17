import { connectToDb, Article } from '../lib/mongodb';

export default async function handler(req, res) {
  const isConnected = await connectToDb();
  if (!isConnected) {
    return res.status(503).json({ error: 'Service Unavailable: Could not connect to the database.' });
  }

  try {
    const trending = await Article.find()
      .sort({ views: -1 })
      .limit(5)
      .select('title views');
    res.status(200).json(trending);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
