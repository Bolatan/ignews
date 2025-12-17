import { connectToDb, Article } from '../lib/mongodb';

export default async function handler(req, res) {
  await connectToDb();

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
