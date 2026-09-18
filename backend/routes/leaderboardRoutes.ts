import { Router } from 'express';
import { LeaderboardService } from '../services/leaderboardService.js';
import { isDatabaseConnected } from '../config/database.js';
import { db } from '../../server/db.js';

const router = Router();

// GET /api/leaderboard
router.get('/', async (req, res) => {
  try {
    const { testCode, topicId, subjectId, department } = req.query;

    if (!isDatabaseConnected() && !process.env.MONGODB_URI) {
      const fallbackResult = db.getLeaderboard(
        topicId ? String(topicId) : undefined,
        subjectId ? String(subjectId) : undefined,
        testCode ? String(testCode) : undefined,
        department ? String(department) : undefined
      );
      return res.json(fallbackResult);
    }

    const result = await LeaderboardService.getLeaderboard({
      testCode: testCode ? String(testCode) : undefined,
      topicId: topicId ? String(topicId) : undefined,
      subjectId: subjectId ? String(subjectId) : undefined,
      department: department ? String(department) : undefined,
    });

    if (!result) {
      const fallbackResult = db.getLeaderboard(
        topicId ? String(topicId) : undefined,
        subjectId ? String(subjectId) : undefined,
        testCode ? String(testCode) : undefined,
        department ? String(department) : undefined
      );
      return res.json(fallbackResult);
    }

    res.json(result);
  } catch (err: any) {
    console.warn('Notice: MongoDB leaderboard fallback to internal store:', err.message);
    const { testCode, topicId, subjectId, department } = req.query;
    const fallbackResult = db.getLeaderboard(
      topicId ? String(topicId) : undefined,
      subjectId ? String(subjectId) : undefined,
      testCode ? String(testCode) : undefined,
      department ? String(department) : undefined
    );
    res.json(fallbackResult);
  }
});

export default router;
