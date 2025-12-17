import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isDbConnected = false;

export const connectToDb = async () => {
  if (isDbConnected) {
    return;
  }
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
  }
};

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

export const Article = mongoose.models.Article || mongoose.model('Article', articleSchema);
