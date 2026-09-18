import { Router } from 'express';
import { db } from '../../server/db.js';
import { QuestionService } from '../services/questionService.js';
import { optionalAuth, AuthenticatedRequest } from '../middlewares/authMiddleware.js';

const router = Router();

// GET /api/subjects
router.get('/subjects', (_req, res) => {
  try {
    const subjects = db.getSubjects();
    res.json(subjects);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/topics
router.get('/topics', (req, res) => {
  try {
    const { subjectId } = req.query;
    const topics = db.getTopics(subjectId as string);
    res.json(topics);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/topics/:id
router.get('/topics/:id', (req, res) => {
  try {
    const topic = db.getTopicById(req.params.id);
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    res.json(topic);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/questions
router.get('/questions', async (req, res) => {
  try {
    const { topicId, bloomLevel, approved } = req.query;
    const filters: any = {};
    if (topicId) filters.topicId = String(topicId);
    if (bloomLevel) filters.bloomLevel = String(bloomLevel);
    if (approved !== undefined) filters.approved = approved === 'true';

    const questions = await QuestionService.getQuestions(filters);
    res.json(questions);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/questions/approve/:id
router.post('/questions/approve/:id', async (req, res) => {
  try {
    const success = await QuestionService.approveQuestion(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/questions/edit/:id
router.post('/questions/edit/:id', async (req, res) => {
  try {
    const { questionText, options, correctAnswer, explanation, bloomLevel } = req.body;
    const success = await QuestionService.updateQuestion(req.params.id, {
      questionText,
      options,
      correctAnswer,
      explanation,
      bloomLevel,
    });
    if (!success) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/questions/delete/:id
router.post('/questions/delete/:id', async (req, res) => {
  try {
    const success = await QuestionService.deleteQuestion(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/books/repositories
router.get('/books/repositories', (_req, res) => {
  try {
    const repos = QuestionService.getBookRepositories();
    res.json({ success: true, repositories: repos });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/books/import-all
router.post('/books/import-all', async (req, res) => {
  try {
    const { topicId } = req.body || {};
    const result = await QuestionService.importAllBookQuestions(topicId);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/questions/generate
router.post('/questions/generate', optionalAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const { topicId, bloomLevel, bloomLevels, count, sourceMode } = req.body;
    const result = await QuestionService.generateQuestions({
      topicId,
      bloomLevel,
      bloomLevels,
      count,
      sourceMode,
      studentId: req.student?.id,
    });
    res.json({
      success: true,
      ...result,
    });
  } catch (err: any) {
    console.error('Question generation failure:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
