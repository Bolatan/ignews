import express from 'express';
import path from 'path';
import fs from 'fs';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const apiDir = path.join(__dirname, '../frontend/api');

fs.readdirSync(apiDir).forEach(async (file) => {
  const routePath = path.join(apiDir, file);
  if (fs.lstatSync(routePath).isDirectory()) {
    const indexPath = path.join(routePath, 'index.js');
    if (fs.existsSync(indexPath)) {
      const { default: route } = await import(indexPath);
      app.use(`/api/${file}`, route);
    }
  } else {
    const { default: route } = await import(path.join(apiDir, file));
    const routeName = file.replace('.js', '');
    app.use(`/api/${routeName}`, route);
  }
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
