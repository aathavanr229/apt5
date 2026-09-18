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
  timeTakenSeconds: number;
  answers: SubmittedAnswerInput[];
}

export class GradingService {
  /**
   * Evaluates answers authoritatively, checks equivalence via Gemini Flash, and persists Attempt to MongoDB.
   */
  static async evaluateAndSaveAttempt(input: GradeAttemptInput): Promise<IAttempt> {
    const { student, testCode, topicId, topicName, subjectId, bloomLevel, timeTakenSeconds, answers } = input;

    // 1. Authoritative Student Identity from MongoDB
    const studentDoc = await Student.findById(student.id);
    const realStudentName = studentDoc ? studentDoc.name : student.name;
    const realStudentRoll = studentDoc ? studentDoc.rollNumber : student.rollNumber;
    const realStudentEmail = studentDoc ? studentDoc.email : student.email;
    const realStudentDept = studentDoc ? studentDoc.department : student.department;

    // 2. Fetch locked questions from TestSession if present
    const testSession = await TestSession.findOne({ testCode });
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

              const aiRes = await ai.models.generateContent({
                model: 'gemini-3.6-flash',
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

    const attemptData = {
      id: `att-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      studentId: studentDoc ? studentDoc._id : student.id,
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
      _id: attemptData.id,
      ...attemptData
    }) as IAttempt;
  }
}
