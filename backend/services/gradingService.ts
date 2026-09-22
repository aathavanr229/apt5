import mongoose from 'mongoose';
import { GoogleGenAI, Type } from '@google/genai';
import { Attempt, IAttempt, IAttemptAnswer } from '../models/Attempt.js';
import { Student } from '../models/Student.js';
import { TestSession } from '../models/TestSession.js';
import { AuthenticatedStudent } from '../middlewares/authMiddleware.js';
import { db } from '../../server/db.js';

let aiClient: GoogleGenAI | null = null;
export function getAiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY || process.env.GEMINI_KEY;
    if (!apiKey) {
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aptitude-forge-assessment',
        },
      },
    });
  }
  return aiClient;
}

export function normalizeValue(val: string): string {
  if (!val) return '';
  return val
    .toLowerCase()
    .replace(/\s+/g, '') // Remove whitespace
    .replace(/[%,$,rs.,₹,meters,seconds,sec,min,hrs,hours,days,kg,gm]/g, '') // Strip units
    .trim();
}

export interface SubmittedAnswerInput {
  questionId: string;
  userAnswer: string;
  // Optional client-supplied fields as fallback if test session is not found
  questionText?: string;
  qtype?: 'mcq' | 'short';
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
}

export interface GradeAttemptInput {
  student: AuthenticatedStudent;
  testCode: string;
  topicId: string;
  topicName?: string;
  subjectId?: string;
  bloomLevel?: string;
  timeTakenSeconds?: number;
  answers: SubmittedAnswerInput[];
}

export class GradingService {
  /**
   * Evaluates answers authoritatively, checks equivalence via Gemini Flash, and persists Attempt to MongoDB & Local DB.
   */
  static async evaluateAndSaveAttempt(input: GradeAttemptInput): Promise<IAttempt> {
    const { student, testCode, topicId, topicName, subjectId, bloomLevel, timeTakenSeconds, answers } = input;

    // 1. Authoritative Student Identity lookup with safe fallback
    let studentDoc: any = null;
    try {
      if (student.id && mongoose.Types.ObjectId.isValid(student.id)) {
        studentDoc = await Student.findById(student.id);
      } else if (student.rollNumber) {
        studentDoc = await Student.findOne({ rollNumber: student.rollNumber.toUpperCase() });
      }
    } catch (e) {
      console.warn('Notice: Student lookup in MongoDB skipped:', e);
    }

    const realStudentName = studentDoc ? studentDoc.name : student.name;
    const realStudentRoll = studentDoc ? studentDoc.rollNumber : student.rollNumber;
    const realStudentEmail = studentDoc ? studentDoc.email : student.email;
    const realStudentDept = studentDoc ? studentDoc.department : student.department;

    // Determine a valid MongoDB ObjectId for studentId field
    let validStudentId: mongoose.Types.ObjectId;
    if (studentDoc && studentDoc._id) {
      validStudentId = studentDoc._id;
    } else if (student.id && mongoose.Types.ObjectId.isValid(student.id)) {
      validStudentId = new mongoose.Types.ObjectId(student.id);
    } else {
      validStudentId = new mongoose.Types.ObjectId();
    }

    // 2. Fetch locked questions from TestSession if present
    let testSession: any = null;
    try {
      testSession = await TestSession.findOne({ testCode });
    } catch {
      // Offline fallback
    }

    const sessionQuestionsMap = new Map<string, any>();
    if (testSession && Array.isArray(testSession.questions)) {
      for (const q of testSession.questions) {
        sessionQuestionsMap.set(q.id, q);
      }
    }

    const gradedAnswers: IAttemptAnswer[] = [];
    const bloomBreakdown: Record<string, { score: number; total: number }> = {};
    let score = 0;

    for (const ans of answers) {
      // Prefer server-stored question definition to avoid client tampering
      const serverQ = sessionQuestionsMap.get(ans.questionId);
      const qtype = serverQ ? serverQ.qtype : ans.qtype || 'mcq';
      const questionText = serverQ ? serverQ.questionText : ans.questionText || '';
      const options = serverQ ? serverQ.options : ans.options || [];
      const correctAnswer = serverQ ? serverQ.correctAnswer : ans.correctAnswer || '';
      const explanation = serverQ ? serverQ.explanation : ans.explanation || '';
      const questionBloom = serverQ ? serverQ.bloomLevel : bloomLevel || 'Apply';

      const userAnswer = String(ans.userAnswer || '').trim();
      let isCorrect = false;
      let graderReason = '';

      if (qtype === 'mcq') {
        isCorrect = userAnswer.toLowerCase() === correctAnswer.trim().toLowerCase();
        graderReason = isCorrect ? 'Correct option selected.' : 'Incorrect option selected.';
      } else {
        // Short Answer Normalization & Equivalence Check
        const normUser = normalizeValue(userAnswer);
        const normCorrect = normalizeValue(correctAnswer);

        if (normUser === normCorrect && normUser.length > 0) {
          isCorrect = true;
          graderReason = 'Exact normalized value matched.';
        } else if (normUser.length > 0) {
          // Verify equivalence via Gemini if available
          try {
            const ai = getAiClient();
            if (ai) {
              const verifyPrompt = `Evaluate if the student's answer is mathematically or conceptually equivalent to the correct answer.

Question: ${questionText}
Correct Answer: ${correctAnswer}
Student Answer: ${userAnswer}

Consider equivalent formats, rounding (e.g. 0.33 vs 1/3), percentages (e.g. 50% vs 0.5), algebraic forms, and standard units.
Provide a boolean field 'correct' and a short explanation 'reason'.`;

              const candidateModels = ['gemini-3.6-flash', 'gemini-2.5-flash', 'gemini-2.0-flash'];
              let aiRes: any = null;

              for (const m of candidateModels) {
                try {
                  aiRes = await ai.models.generateContent({
                    model: m,
                    contents: verifyPrompt,
                    config: {
                      responseMimeType: 'application/json',
                      responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                          correct: { type: Type.BOOLEAN },
                          reason: { type: Type.STRING },
                        },
                        required: ['correct', 'reason'],
                      },
                    },
                  });
                  if (aiRes && aiRes.text) break;
                } catch {
                  // try next model
                }
              }

              if (aiRes.text) {
                const check = JSON.parse(aiRes.text);
                isCorrect = Boolean(check.correct);
                graderReason = check.reason || 'Verified by AI Mathematical Grader.';
              }
            } else {
              graderReason = 'Direct normalized evaluation applied.';
            }
          } catch (aiErr: any) {
            console.warn('AI Answer Equivalence check error:', aiErr?.message || aiErr);
            graderReason = 'Evaluated using local normalized match.';
          }
        } else {
          graderReason = 'No answer provided.';
        }
      }

      if (isCorrect) {
        score++;
      }

      // Track Bloom Breakdown
      if (!bloomBreakdown[questionBloom]) {
        bloomBreakdown[questionBloom] = { score: 0, total: 0 };
      }
      bloomBreakdown[questionBloom].total++;
      if (isCorrect) {
        bloomBreakdown[questionBloom].score++;
      }

      gradedAnswers.push({
        questionId: ans.questionId,
        questionText,
        qtype,
        options,
        userAnswer,
        correctAnswer,
        correct: isCorrect,
        explanation,
        graderReason,
      });
    }

    const totalQuestions = Math.max(1, answers.length);
    const percentage = Math.round((score / totalQuestions) * 100);

    const attemptObjectId = new mongoose.Types.ObjectId();
    const attemptIdStr = attemptObjectId.toString();

    const attemptData = {
      _id: attemptObjectId,
      id: attemptIdStr,
      studentId: validStudentId,
      studentName: realStudentName,
      studentRoll: realStudentRoll,
      studentEmail: realStudentEmail,
      studentDepartment: realStudentDept,
      testCode: (testCode || 'APT-GENERAL').toUpperCase(),
      topicId,
      topicName: topicName || 'Aptitude Test',
      subjectId: subjectId || 'subj-aptitude',
      bloomLevel: bloomLevel || 'Apply',
      score,
      total: answers.length,
      percentage,
      timeTakenSeconds: Math.max(5, timeTakenSeconds || 0),
      bloomBreakdown,
      answers: gradedAnswers,
      submittedAt: new Date(),
      createdAt: new Date().toISOString()
    };

    // Save to local/persistent memory DB
    try {
      db.addAttempt(attemptData as any);
    } catch (e) {
      console.warn('Notice: Local DB attempt recording notice:', e);
    }

    let attemptDoc: any = null;
    try {
      attemptDoc = await Attempt.create(attemptData);
    } catch (err) {
      console.warn('Notice: MongoDB attempt persistence fallback to in-memory/file:', err);
    }

    return (attemptDoc || {
      _id: attemptObjectId,
      id: attemptIdStr,
      ...attemptData
    }) as IAttempt;
  }
}
