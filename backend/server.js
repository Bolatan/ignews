import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Models
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, default: '' },
  category: { type: String, required: true },
  author: { type: String, required: true },
  image: String,
  views: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Article = mongoose.model('Article', articleSchema);

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Igbe Laara News API', 
    status: 'running',
    endpoints: {
      articles: '/api/articles',
      trending: '/api/trending',
      seed: '/api/seed (POST)'
    }
  });
});

app.get('/api', (req, res) => {
  res.json({ message: 'API is working', status: 'ok' });
});

// Get all articles
app.get('/api/articles', async (req, res) => {
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
      
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single article
app.get('/api/articles/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    article.views += 1;
    await article.save();
    
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create article
app.post('/api/articles', async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get trending
app.get('/api/trending', async (req, res) => {
  try {
    const trending = await Article.find()
      .sort({ views: -1 })
      .limit(5)
      .select('title views');
    res.json(trending);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Seed database
app.post('/api/seed', async (req, res) => {
  try {
    const count = await Article.countDocuments();
    if (count > 0) {
      return res.json({ message: 'Database already has articles', count });
    }
    
    const articles = [
      {
        title: 'New Infrastructure Project Announced for Ikorodu Division',
        excerpt: 'Lagos State Government unveils ambitious plan to upgrade roads and facilities in Igbe Laara and surrounding communities...',
        content: 'Full article content...',
        category: 'Local News',
        author: 'Adewale Johnson',
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop',
        views: 1243,
        comments: 28,
        featured: true
      },
      {
        title: 'Local Market Traders Protest Rising Costs',
        excerpt: 'Traders at Igbe Laara market staged a peaceful protest today...',
        content: 'Full article content...',
        category: 'Local News',
        author: 'Ngozi Okafor',
        image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&auto=format&fit=crop',
        views: 892,
        comments: 45
      },
      {
        title: 'Nigerian Tech Startup Raises $5M in Series A Funding',
        excerpt: 'A Lagos-based fintech company secures major investment...',
        content: 'Full article content...',
        category: 'Technology',
        author: 'Chidi Eze',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop',
        views: 2156,
        comments: 67
      }
    ];
    
    await Article.insertMany(articles);
    res.json({ message: 'Database seeded successfully', count: articles.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});