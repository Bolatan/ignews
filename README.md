# Igbe Laara News

News website for Igbe Laara, Lagos, Nigeria

## Structure
This is a monorepo managed with Turborepo.
- `frontend` - React + Vite frontend
- `backend` - Express + MongoDB backend

## Local Development
First, install the dependencies from the root of the project:
```bash
npm install
```

Then, you can run the development servers for both the frontend and backend concurrently:
```bash
npm run dev
```

## Building for Production
To build both the frontend and backend for production, run the following command from the root:
```bash
npm run build
```

## Deployment
This project is configured for a single, unified deployment to Vercel. Push to your Vercel-connected repository to deploy.
