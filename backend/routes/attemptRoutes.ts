import { Router } from 'express';
import { Attempt, IAttempt } from '../models/Attempt.js';
import { Student } from '../models/Student.js';
import { GradingService } from '../services/gradingService.js';
import { requireAuth, optionalAuth, AuthenticatedRequest, AuthenticatedStudent } from '../middlewares/authMiddleware.js';

const router = Router();

// POST /api/attempts - Submit Attempt & Authoritative Server Grading
router.post('/', optionalAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const {
      topicId,
      topicName,
      subjectId,
      bloomLevel,
      testCode,
      timeTakenSeconds,
      answers,
      studentRoll,
    } = req.body;

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ error: 'No answers provided for evaluation.' });
    }

    // Determine authoritative student
    let activeStudent: AuthenticatedStudent | null = req.student || null;

    if (!activeStudent && studentRoll) {
      // Fallback lookup from MongoDB student record if JWT header was missed
      const cleanRoll = String(studentRoll).trim().toUpperCase();
      const studentDoc = await Student.findOne({ rollNumber: cleanRoll });
      if (studentDoc) {
        activeStudent = {
          id: studentDoc._id.toString(),
          rollNumber: studentDoc.rollNumber,
          name: studentDoc.name,
          email: studentDoc.email,
          department: studentDoc.department,
        };
      }
    }

    if (!activeStudent) {
      return res.status(401).json({
        error: 'Authentication required. Please log in with your student account to record test attempts.',
        code: 'AUTH_REQUIRED',
      });
    }

    const attempt = await GradingService.evaluateAndSaveAttempt({
      student: activeStudent,
      testCode: testCode || 'APT-GENERAL',
      topicId: topicId || 'topic-general',
      topicName,
      subjectId,
      bloomLevel,
      timeTakenSeconds: Number(timeTakenSeconds) || 0,
      answers,
    });

    res.status(201).json({
      success: true,
      attemptId: attempt._id.toString(),
      testCode: attempt.testCode,
      score: attempt.score,
      total: attempt.total,
      percentage: attempt.percentage,
    });
  } catch (err: any) {
    console.error('Error in attempt submission:', err);
    res.status(500).json({ error: err.message || 'Failed to evaluate attempt' });
  }
});

// GET /api/attempts - Get all attempts (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { topicId, subjectId, testCode, studentRoll } = req.query;
    const filter: any = {};

    if (topicId && topicId !== 'all') filter.topicId = String(topicId);
    if (subjectId && subjectId !== 'all') filter.subjectId = String(subjectId);
    if (testCode && testCode !== 'all') filter.testCode = String(testCode).toUpperCase();
    if (studentRoll) filter.studentRoll = String(studentRoll).toUpperCase();

    const attempts = await Attempt.find(filter)
      .sort({ submittedAt: -1 })
      .limit(100)
      .lean();

    res.json(
      attempts.map((a: any) => ({
        id: a._id.toString(),
        topicId: a.topicId,
        topicName: a.topicName,
        subjectId: a.subjectId,
        testCode: a.testCode,
        bloomLevel: a.bloomLevel,
        studentName: a.studentName,
        studentRoll: a.studentRoll,
        studentEmail: a.studentEmail,
        studentDepartment: a.studentDepartment,
        score: a.score,
        total: a.total,
        percentage: a.percentage,
        timeTakenSeconds: a.timeTakenSeconds,
        answers: a.answers,
        createdAt: (a.submittedAt || a.createdAt).toISOString(),
      }))
    );
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/attempts/:id - Get Attempt by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let attempt = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      attempt = await Attempt.findById(id).lean();
    } else {
      attempt = await Attempt.findOne({ testCode: id }).lean();
    }

    if (!attempt) {
      return res.status(404).json({ error: 'Attempt record not found' });
    }

    const a = attempt as any;
    res.json({
      id: a._id.toString(),
      topicId: a.topicId,
      topicName: a.topicName,
      subjectId: a.subjectId,
      testCode: a.testCode,
      bloomLevel: a.bloomLevel,
      studentName: a.studentName,
      studentRoll: a.studentRoll,
      studentEmail: a.studentEmail,
      studentDepartment: a.studentDepartment,
      score: a.score,
      total: a.total,
      percentage: a.percentage,
      timeTakenSeconds: a.timeTakenSeconds,
      answers: a.answers,
      bloomBreakdown: a.bloomBreakdown,
      createdAt: (a.submittedAt || a.createdAt).toISOString(),
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
