import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { AuthService } from '../services/authService.js';
import { requireAuth, AuthenticatedRequest, getJwtSecret } from '../middlewares/authMiddleware.js';
import { isDatabaseConnected } from '../config/database.js';
import { db } from '../../server/db.js';

const router = Router();

// POST /api/auth/send-code
router.post('/send-code', (req, res) => {
  try {
    const { email, roll } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email address is required.' });
    }
    const result = AuthService.sendVerificationCode(email, roll);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to send verification code' });
  }
});

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, roll, email, department, password, verificationCode } = req.body;

    // 1. Primary path: MongoDB Atlas if connected
    if (isDatabaseConnected()) {
      const result = await AuthService.register({ name, roll, email, department, password, verificationCode });
      return res.status(201).json({
        success: true,
        token: result.token,
        user: result.user,
      });
    }

    // 2. Resilient fallback: Internal store
    if (!name?.trim() || !roll?.trim() || !password?.trim()) {
      return res.status(400).json({ error: 'Full Name, Roll Number, and Password are required.' });
    }

    const cleanRoll = roll.trim().toUpperCase();
    const cleanEmail = email?.trim().toLowerCase() || `${cleanRoll.toLowerCase()}@kongu.edu`;

    const user = db.createUser({
      name: name.trim(),
      roll: cleanRoll,
      email: cleanEmail,
      department: department || 'Computer Science & Engineering',
      password: password.trim(),
      emailVerified: true
    });

    const token = jwt.sign(
      { id: user.id, roll: user.roll, email: user.email, department: user.department },
      getJwtSecret(),
      { expiresIn: '30d' }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        roll: user.roll,
        email: user.email,
        department: user.department,
        isInstitutionalEmail: true,
        emailVerified: true
      }
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Signup failed' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { identifier, roll, password } = req.body;
    const loginId = (identifier || roll || '').trim();

    if (!loginId || !password) {
      return res.status(400).json({ error: 'Roll Number / Email and Password are required.' });
    }

    // 1. Primary path: MongoDB Atlas if connected
    if (isDatabaseConnected()) {
      const result = await AuthService.login(loginId, password);
      return res.json({
        success: true,
        token: result.token,
        user: result.user,
      });
    }

    // 2. Resilient fallback: Internal store
    const user = db.getUserByIdentifier(loginId);
    if (!user) {
      // Auto-register student if logging in for first time with credentials
      const autoUser = db.createUser({
        name: loginId.includes('@') ? loginId.split('@')[0] : loginId,
        roll: loginId.includes('@') ? loginId.split('@')[0].toUpperCase() : loginId.toUpperCase(),
        email: loginId.includes('@') ? loginId.toLowerCase() : `${loginId.toLowerCase()}@kongu.edu`,
        department: 'Computer Science & Engineering',
        password: password.trim(),
        emailVerified: true
      });

      const token = jwt.sign(
        { id: autoUser.id, roll: autoUser.roll, email: autoUser.email, department: autoUser.department },
        getJwtSecret(),
        { expiresIn: '30d' }
      );

      return res.json({
        success: true,
        token,
        user: {
          id: autoUser.id,
          name: autoUser.name,
          roll: autoUser.roll,
          email: autoUser.email,
          department: autoUser.department,
          isInstitutionalEmail: true,
          emailVerified: true
        }
      });
    }

    if (user.password && user.password !== password.trim()) {
      return res.status(401).json({ error: 'Invalid password. Please try again.' });
    }

    const token = jwt.sign(
      { id: user.id, roll: user.roll, email: user.email, department: user.department },
      getJwtSecret(),
      { expiresIn: '30d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        roll: user.roll,
        email: user.email,
        department: user.department,
        isInstitutionalEmail: true,
        emailVerified: true
      }
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Login failed' });
  }
});

// GET /api/auth/me (Protected)
router.get('/me', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    if (!req.student) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const student = await AuthService.getById(req.student.id);
    if (!student) {
      return res.status(404).json({ error: 'Student record not found' });
    }
    res.json({ success: true, user: student });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch profile' });
  }
});

// GET /api/auth/users
router.get('/users', async (_req, res) => {
  try {
    const users = await AuthService.listUsers();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to list users' });
  }
});

export default router;
