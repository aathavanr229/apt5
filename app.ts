import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { connectToDatabase, isDatabaseConnected } from './backend/config/database.js';
import healthRoutes from './backend/routes/healthRoutes.js';
import authRoutes from './backend/routes/authRoutes.js';
import questionRoutes from './backend/routes/questionRoutes.js';
import attemptRoutes from './backend/routes/attemptRoutes.js';
import leaderboardRoutes from './backend/routes/leaderboardRoutes.js';

// Load environment variables (.env.local first, then .env)
dotenv.config({ path: '.env.local' });
dotenv.config();

// Safety guard: prevent background network drops from crashing process
process.on('unhandledRejection', (reason: any) => {
  if (reason?.name === 'MongooseServerSelectionError' || reason?.message?.includes('whitelisted')) {
    return; // Handled gracefully by internal store
  }
  console.warn('Process warning:', reason?.message || reason);
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serverless / Development Lazy Database Connection Middleware (API calls only)
app.use(async (req, _res, next) => {
  if (req.path.startsWith('/api') && process.env.MONGODB_URI && !isDatabaseConnected()) {
    try {
      await connectToDatabase();
    } catch {
      // Handled inside connectToDatabase with dual-engine fallback
    }
  }
  next();
});

// API Routes
app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', questionRoutes);
app.use('/api/attempts', attemptRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// Server startup function
async function startServer() {
  // If running in Vercel serverless environment, do not start local HTTP listener
  if (process.env.VERCEL) {
    return;
  }

  // Attempt initial database connection in background
  if (process.env.MONGODB_URI) {
    connectToDatabase().catch(() => {});
  } else {
    console.log('Notice: Running in persistent local store mode (MONGODB_URI not configured).');
  }

  // Vite middleware for development vs static dist for production
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api')) {
        return next();
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT) || 3000, '0.0.0.0', () => {
    console.log(`Aptitude Forge server running at http://localhost:${PORT || 3000}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
export { app };