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
let isDbConnected = false;

const connectToDb = async () => {
  if (!process.env.MONGODB_URI) {
    console.warn('❌ MONGODB_URI is not defined. Skipping database connection.');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully');
    isDbConnected = true;
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    isDbConnected = false;
    // We don't re-throw the error here to allow the server to start.
  }
};

// Database availability middleware
const checkDbConnection = (req, res, next) => {
  if (isDbConnected) {
    return next();
  }
  res.status(503).json({
    error: 'Service Unavailable: Database connection is not established.'
  });
};


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

const apiRouter = express.Router();

app.get('/', (req, res) => {
  res.json({ 
    message: 'Igbe Laara News API', 
    status: 'running',
    dbConnected: isDbConnected,
    endpoints: {
      articles: '/articles',
      trending: '/trending'
    }
  });
});

// All routes that require a DB connection should use the middleware
apiRouter.get('/articles', checkDbConnection, async (req, res) => {
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

apiRouter.get('/articles/:id', checkDbConnection, async (req, res) => {
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

apiRouter.post('/articles', checkDbConnection, async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

apiRouter.get('/trending', checkDbConnection, async (req, res) => {
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


// Mount the API router
app.use(apiRouter);

// Connect to DB for serverless environment
connectToDb();

export default app;
