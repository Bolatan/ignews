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

The backend requires environment variables to run. For local development, copy the example file and update it with your configuration.

```bash
cd backend
cp .env.example .env
```

The following variables need to be set in the `.env` file:

- `FRONTEND_URL`: The URL of the frontend application for CORS. Defaults to `http://localhost:5173`.
- `MONGODB_URI`: Your MongoDB connection string.
- `PORT`: The port the backend server will run on. Defaults to `5000`.


## Deployment on Vercel

This project is configured as a monorepo for Vercel.

### Environment Variables on Vercel

When deploying to Vercel, you need to set the same environment variables in your Vercel project settings.

1.  Go to your project on Vercel.
2.  Navigate to the **Settings** tab.
3.  Click on **Environment Variables**.
4.  Add the following variables:
    *   `MONGODB_URI`: Your production MongoDB connection string.
    *   `FRONTEND_URL`: The URL of your deployed frontend application.

The `PORT` variable is automatically managed by Vercel, so you do not need to set it.
