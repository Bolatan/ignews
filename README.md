# Igbe Laara News

News website for Igbe Laara, Lagos, Nigeria

## Structure
- `/frontend` - React + Vite frontend
- `/backend` - Express + MongoDB backend

## Local Development

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm start
```

### Environment Variables

The backend requires environment variables to run. Copy the example file and update it with your configuration.

```bash
cd backend
cp .env.example .env
```

The following variables need to be set in the `.env` file:

- `FRONTEND_URL`: The URL of the frontend application for CORS. Defaults to `http://localhost:5173`.
- `MONGODB_URI`: Your MongoDB connection string.
- `PORT`: The port the backend server will run on. Defaults to `5000`.


## Deployment
Deploy frontend and backend separately to Vercel
