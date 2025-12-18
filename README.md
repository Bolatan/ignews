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

## Admin Account
To set up the admin account, you will need to create a `.env` file in the `frontend` directory and add the following environment variables. For production, these should be set in your Vercel project settings.

```
# .env file for local development
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secure_password_123
JWT_SECRET=aeed09dfb7d3ceebe89879a5c80b9d20774c2186e3ddfc2c3a8e97bb96810f9c
```

You can then log in by navigating to `/admin/login` and using the credentials you have set.
