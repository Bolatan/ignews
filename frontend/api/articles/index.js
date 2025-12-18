import { connectToDb, Article } from '../lib/mongodb.js';
import { verifyToken } from '../lib/auth.js';

async function handler(req, res) {
  const isConnected = await connectToDb();
  if (!isConnected) {
    return res.status(503).json({ error: 'Service Unavailable: Could not connect to the database.' });
  }

  if (req.method === 'GET') {
    try {
      const { category, search, limit = 20 } = req.query;
      let query = {};

      if (category && category !== 'All') {
        query.category = category;
      }

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { excerpt: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } }
        ];
      }

      const articles = await Article.find(query)
        .sort({ createdAt: -1 })
        .limit(parseInt(limit));

      res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const article = new Article(req.body);
      await article.save();
      res.status(201).json(article);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default (req, res) => {
  if (req.method === 'POST') {
    return verifyToken(handler)(req, res);
  }
  return handler(req, res);
};
