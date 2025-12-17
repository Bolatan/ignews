import { connectToDb, Article } from '../lib/mongodb';

export default async function handler(req, res) {
  const { id } = req.query;

  const isConnected = await connectToDb();
  if (!isConnected) {
    return res.status(503).json({ error: 'Service Unavailable: Could not connect to the database.' });
  }

  if (req.method === 'GET') {
    try {
      const article = await Article.findById(id);
      if (!article) {
        return res.status(404).json({ error: 'Article not found' });
      }

      article.views += 1;
      await article.save();

      res.status(200).json(article);
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(400).json({ error: 'Invalid article ID format' });
      }
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
