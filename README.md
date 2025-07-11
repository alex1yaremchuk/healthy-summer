# Healthy Summer Monorepo

This repository contains a frontend application and four microservices. The project uses **pnpm workspaces** for dependency management.

## Packages
- `frontend` – React + Vite + Chakra UI
- `user-service` – Express + TypeScript, JWT authentication (uses PostgreSQL via Prisma)
- `activity-service` – Express + TypeScript
- `nutrition-service` – Express + TypeScript
- `social-service` – Express + TypeScript

All services use the same PostgreSQL database defined by `DATABASE_URL` in their `.env` files.

## Development
1. Install dependencies with `pnpm install` at the repository root.
2. Run any package in development mode with `pnpm --filter <package> dev`.

The frontend proxies API requests starting with `/api` to `http://localhost:3000` by default.
