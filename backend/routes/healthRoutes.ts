import { Router } from 'express';
import { getDatabaseState } from '../config/database.js';

const router = Router();

// GET /api/health - Production health & diagnostics endpoint
router.get('/health', (_req, res) => {
  const dbState = getDatabaseState();
  const hasGemini = Boolean(process.env.GEMINI_API_KEY || process.env.GEMINI_KEY);
  const hasMongoUri = Boolean(process.env.MONGODB_URI);

  res.json({
    status: 'ok',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    services: {
      api: true,
      mongodb: {
        configured: hasMongoUri,
        connected: dbState.connected,
        state: dbState.status,
      },
      gemini: {
        configured: hasGemini,
      },
    },
  });
});

// GET /api/config-status - Frontend configuration check
router.get('/config-status', (_req, res) => {
  const dbState = getDatabaseState();
  res.json({
    hasApiKey: Boolean(process.env.GEMINI_API_KEY || process.env.GEMINI_KEY),
    hasMongoUri: Boolean(process.env.MONGODB_URI),
    isMongoConnected: dbState.connected,
    mongoState: dbState.status,
    environment: process.env.NODE_ENV || 'development',
    isVercel: Boolean(process.env.VERCEL),
  });
});

export default router;
