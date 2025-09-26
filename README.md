# POKEMON RETRO EDITION

A web application that can bring you back to the classic Pokemon experience with a retro aesthetic.

## Features

- Browse and search through a comprehensive list of Pokemon
- View detailed information about each Pokemon, including stats, abilities, and types
- Create and manage your own Pokemon teams
- Mark and manage your favorite Pokemon

## Tech Stack

<p align="center">
    <a href="http://nestjs.com/" target="blank" style="display:inline-block; margin-right:40px;">
        <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
    </a>
    <a href="https://nextjs.org/" target="blank" style="display:inline-block;">
        <img src="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png" width="120" alt="Next.js Logo" />
    </a>
</p>

This project is built with modern web technologies to provide a robust and scalable Pokemon management experience:

### Frontend

- **Next.js** - React framework for production-ready applications
- **Redux** - State management for predictable application state
- **TypeScript** - Type-safe JavaScript for better development experience
- **Shadcn UI** - Beautifully designed components built with Radix UI and Tailwind CSS

### Backend

- **NestJS** - Progressive Node.js framework for scalable server-side applications
- **TypeORM** - Object-relational mapping for TypeScript and JavaScript
- **SQLite** - Lightweight database for development
- **Fastify** - Fast and low overhead web framework

### Development Tools

- **Docker** - Containerization for consistent development environments
- **Swagger** - API documentation and testing
- **RTK Query** - Efficient data fetching and caching for Redux

## How to Run Locally

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn package manager
- Git

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd modinity-pokemon
   ```

2. **Install dependencies for both frontend and backend**

   ```bash
   # Install backend dependencies
   npm run install:service

   # Install frontend dependencies
   npm run install:app
   ```

3. **Add environment variables**

   Create a `.env` file in the `modinity-pokemon-service` directory with the following content:

   ```
   NODE_ENV=development
   PORT=3001
   DB_PATH=sqlite://./db.sqlite
   ```

   Create a `.env` file in the `modinity-pokemon-app` directory with the following content:

   ```
   API_URL=http://localhost:3001
   ```

4. **Start the development servers**

   **Option 1: Start both services simultaneously**

   ```bash
   # Start backend in development mode
   npm run start-service:dev

   # In a new terminal, start frontend
   npm run start-app:dev
   ```

   **Option 2: Start services individually**

   ```bash
   # Backend (NestJS API)
   cd modinity-pokemon-service
   npm run start:dev

   # Frontend (Next.js App) - in a new terminal
   cd modinity-pokemon-app
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Swagger Documentation: http://localhost:3001/api-docs

## Deployment Steps

### Docker Deployment

1. **Using Docker Compose (Recommended)**

   ```bash
   cd modinity-pokemon-service
   docker compose up --build

   # Logs to follow
   docker compose logs -f
   ```

2. **Manual Docker Build**

   ```bash
   # Build backend Docker image
   cd modinity-pokemon-service
   docker build -t pokemon-service .
   docker run -p 3001:3001 pokemon-service
   ```

### Environment Variables

Before deployment, ensure you configure the following environment variables:

**Backend (.env)**

```
  NODE_ENV=development
  PORT=3001
  DB_PATH=./db.sqlite
```

**Frontend (.env.local)**

```
API_URL=http://localhost:3001
```

### Deployment Platforms

1. **Vercel** (Frontend) + **Cloud Run GCP** (Backend)

**Note:** This application is designed for demonstration purposes.
