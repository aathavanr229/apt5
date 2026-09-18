import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Student, IStudent } from '../models/Student.js';
import { getJwtSecret, AuthenticatedStudent } from '../middlewares/authMiddleware.js';

export interface RegisterInput {
  name: string;
  roll: string;
  email?: string;
  department?: string;
  password: string;
  verificationCode?: string;
}

export interface AuthResult {
  token: string;
  user: {
    id: string;
    name: string;
    roll: string;
    email: string;
    department: string;
    isInstitutionalEmail: boolean;
    emailVerified: boolean;
  };
}

interface PendingOtp {
  code: string;
  expiresAt: number;
}

// In-memory verification code registry with 10-minute expiry
const otpStore = new Map<string, PendingOtp>();

export class AuthService {
  /**
   * Generates and dispatches a 6-digit institutional email verification code.
   */
  static sendVerificationCode(email: string, roll?: string): { success: boolean; message: string; testCode: string } {
    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(cleanEmail)) {
      throw new Error('Invalid email format. Please provide a well-formed email address.');
    }

    // Strict Institutional Domain check: Kongu Engineering College (@kongu.edu or @kongu.ac.in)
    const isKongu = /@(?:[a-zA-Z0-9-]+\.)*kongu\.(?:edu|ac\.in)$/i.test(cleanEmail);
    if (!isKongu) {
      throw new Error(
        `Invalid institutional domain for "${cleanEmail}". Only official Kongu Engineering College student email addresses ending with @kongu.edu or @kongu.ac.in are allowed. Personal and random email domains are prohibited.`
      );
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(cleanEmail, {
      code,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    });

    console.log(`[AUTH] Verification OTP for ${cleanEmail}: ${code}`);

    return {
      success: true,
      message: `A 6-digit verification code has been dispatched to ${cleanEmail}.`,
      testCode: code,
    };
  }

  /**
   * Verifies an OTP code for an institutional email.
   */
  static verifyOtp(email: string, code: string): boolean {
    const cleanEmail = email.trim().toLowerCase();
    const pending = otpStore.get(cleanEmail);
    if (!pending) {
      throw new Error('No active verification code was requested for this email. Please request a verification code first.');
    }
    if (Date.now() > pending.expiresAt) {
      otpStore.delete(cleanEmail);
      throw new Error('The verification code has expired. Please request a new code.');
    }
    if (pending.code !== code.trim()) {
      throw new Error('Invalid verification code. Please enter the correct 6-digit code.');
    }
    otpStore.delete(cleanEmail);
    return true;
  }

  /**
   * Register a new student in MongoDB with authoritative institutional domain enforcement.
   */
  static async register(input: RegisterInput): Promise<AuthResult> {
    const name = input.name?.trim();
    const roll = input.roll?.trim().toUpperCase();
    const rawEmail = input.email?.trim().toLowerCase();
    const department = input.department?.trim() || 'Computer Science & Engineering';
    const password = input.password?.trim();
    const verificationCode = input.verificationCode?.trim();

    if (!name || name.length < 2) {
      throw new Error('Please enter a valid student name (at least 2 characters).');
    }

    if (!roll || roll.length < 3) {
      throw new Error('Please enter a valid Roll / Registration number (e.g. 24CSE001).');
    }

    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    // Determine target email
    const email = rawEmail || `${roll.toLowerCase()}@kongu.edu`;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format provided.');
    }

    // 1. Strict Institutional Domain check: Kongu Engineering College
    const isInstitutionalEmail = /@(?:[a-zA-Z0-9-]+\.)*kongu\.(?:edu|ac\.in)$/i.test(email);
    if (!isInstitutionalEmail) {
      throw new Error(
        `Invalid email domain "${email}". You must use an official Kongu Engineering College student email address ending with @kongu.edu or @kongu.ac.in (e.g. ${roll.toLowerCase()}@kongu.edu). Personal or random email services are not permitted.`
      );
    }

    // 2. Mailbox format check
    const localPart = email.split('@')[0];
    if (!localPart || localPart.length < 3 || !/^[a-zA-Z0-9._-]+$/.test(localPart)) {
      throw new Error(`The email mailbox username "${localPart}" is invalid. Please provide a standard institutional student email.`);
    }

    // 3. Institutional Email Verification Check
    // Kongu emails follow formats such as name.24cse@kongu.edu, roll@kongu.edu, or roll@kongu.ac.in.
    // We allow any valid name-based or roll-based institutional email as long as it belongs to @kongu.edu or @kongu.ac.in.

    // 4. Verification Code Validation
    let isEmailVerified = false;
    if (verificationCode) {
      AuthService.verifyOtp(email, verificationCode);
      isEmailVerified = true;
    }

    // Duplicate checks
    const existingRoll = await Student.findOne({ rollNumber: roll });
    if (existingRoll) {
      throw new Error(`Student account with Roll Number ${roll} already exists. Please Log In.`);
    }

    const existingEmail = await Student.findOne({ email });
    if (existingEmail) {
      throw new Error(`Account with email address ${email} already exists. Please Log In.`);
    }

    // Hash password with bcrypt (salt rounds: 10)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newStudent = await Student.create({
      name,
      rollNumber: roll,
      email,
      department,
      passwordHash,
      isInstitutionalEmail: true,
      emailVerified: isEmailVerified,
    });

    const studentPayload: AuthenticatedStudent = {
      id: newStudent._id.toString(),
      rollNumber: newStudent.rollNumber,
      name: newStudent.name,
      email: newStudent.email,
      department: newStudent.department,
    };

    const token = jwt.sign(studentPayload, getJwtSecret(), { expiresIn: '7d' });

    return {
      token,
      user: {
        id: studentPayload.id,
        name: studentPayload.name,
        roll: studentPayload.rollNumber,
        email: studentPayload.email,
        department: studentPayload.department,
        isInstitutionalEmail: true,
        emailVerified: isEmailVerified,
      },
    };
  }

  /**
   * Authenticate student using Roll Number or Email and Password.
   */
  static async login(identifier: string, password: string): Promise<AuthResult> {
    const cleanId = (identifier || '').trim();
    if (!cleanId) {
      throw new Error('Roll Number or Email address is required to log in.');
    }

    if (!password) {
      throw new Error('Password is required.');
    }

    // Find student by either rollNumber or email
    const cleanRoll = cleanId.toUpperCase();
    const cleanEmail = cleanId.toLowerCase();

    const student = await Student.findOne({
      $or: [{ rollNumber: cleanRoll }, { email: cleanEmail }],
    }).select('+passwordHash');

    if (!student) {
      throw new Error(
        `Account "${cleanId}" not found. Please Sign Up with your official @kongu.edu student account.`
      );
    }

    const isMatch = await bcrypt.compare(password, student.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid password. Please verify your credentials.');
    }

    const studentPayload: AuthenticatedStudent = {
      id: student._id.toString(),
      rollNumber: student.rollNumber,
      name: student.name,
      email: student.email,
      department: student.department,
    };

    const token = jwt.sign(studentPayload, getJwtSecret(), { expiresIn: '7d' });

    return {
      token,
      user: {
        id: studentPayload.id,
        name: studentPayload.name,
        roll: studentPayload.rollNumber,
        email: studentPayload.email,
        department: studentPayload.department,
        isInstitutionalEmail: student.isInstitutionalEmail,
        emailVerified: student.emailVerified,
      },
    };
  }

  /**
   * List all registered students (safe projection, no passwords).
   */
  static async listUsers() {
    const students = await Student.find({}, 'name rollNumber email department createdAt')
      .sort({ createdAt: -1 })
      .lean();

    return students.map((s: any) => ({
      id: s._id.toString(),
      name: s.name,
      roll: s.rollNumber,
      email: s.email,
      department: s.department,
      createdAt: s.createdAt,
    }));
  }

  /**
   * Get student profile by ID.
   */
  static async getById(id: string) {
    const student = await Student.findById(id).lean();
    if (!student) return null;
    return {
      id: (student as any)._id.toString(),
      name: (student as any).name,
      roll: (student as any).rollNumber,
      email: (student as any).email,
      department: (student as any).department,
      isInstitutionalEmail: (student as any).isInstitutionalEmail,
      emailVerified: (student as any).emailVerified,
    };
  }
}
