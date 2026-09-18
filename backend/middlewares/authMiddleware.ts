import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedStudent {
  id: string;
  rollNumber: string;
  name: string;
  email: string;
  department: string;
}

export interface AuthenticatedRequest extends Request {
  student?: AuthenticatedStudent;
}

const JWT_SECRET = process.env.JWT_SECRET || 'aptitude-forge-jwt-production-secret-2026';

export function getJwtSecret(): string {
  return process.env.JWT_SECRET || 'aptitude-forge-jwt-production-secret-2026';
}

/**
 * Strict authentication middleware.
 * Verifies JWT token and binds authoritative student identity to the request.
 */
export function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    let token: string | undefined;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    } else if (req.headers['x-auth-token']) {
      token = String(req.headers['x-auth-token']).trim();
    }

    if (!token) {
      return res.status(401).json({
        error: 'Authentication required. Please sign in to perform this action.',
        code: 'AUTH_TOKEN_MISSING',
      });
    }

    const decoded = jwt.verify(token, getJwtSecret()) as AuthenticatedStudent;
    if (!decoded || !decoded.id || !decoded.rollNumber) {
      return res.status(401).json({
        error: 'Invalid or expired session. Please log in again.',
        code: 'AUTH_TOKEN_INVALID',
      });
    }

    req.student = decoded;
    next();
  } catch (err: any) {
    return res.status(401).json({
      error: 'Session expired or token invalid. Please log in again.',
      code: 'AUTH_FAILED',
      details: err.message,
    });
  }
}

/**
 * Optional authentication middleware.
 * Attaches student identity if a valid token is provided, otherwise continues anonymously.
 */
export function optionalAuth(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) {
  try {
    let token: string | undefined;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    } else if (req.headers['x-auth-token']) {
      token = String(req.headers['x-auth-token']).trim();
    }

    if (token) {
      const decoded = jwt.verify(token, getJwtSecret()) as AuthenticatedStudent;
      if (decoded && decoded.id) {
        req.student = decoded;
      }
    }
  } catch {
    // Ignore invalid token in optional auth
  }
  next();
}
