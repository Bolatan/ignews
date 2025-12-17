# Agent Instructions for Vercel Deployment

This project is a monorepo and requires specific configuration in the Vercel project settings to deploy correctly. The `vercel.json` file is designed to work with these settings.

## Frontend (Vite App)

When deploying the `frontend` application, you MUST configure the project in the Vercel UI as follows:

- **Framework Preset**: `Vite`
- **Root Directory**: `frontend`

This ensures that Vercel runs the `vite build` command from within the `frontend` directory and correctly locates the `dist` output directory. The API rewrites will be handled by the root `vercel.json`.

## Backend (Node.js Server)

The backend is deployed as a serverless function and is managed by the root `vercel.json`. No separate Vercel project is needed for the backend.
