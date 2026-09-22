import { Attempt, IAttempt } from '../models/Attempt.js';
import { db } from '../../server/db.js';

export interface LeaderboardFilter {
  testCode?: string;
  topicId?: string;
  subjectId?: string;
  department?: string;
}

export interface LeaderboardResponse {
  entries: Array<{
    rank: number;
    attemptId: string;
    studentName: string;
    studentRoll: string;
    studentEmail?: string;
    studentDepartment?: string;
    testCode: string;
    topicId: string;
    topicName: string;
    bloomLevel: string;
    score: number;
    total: number;
    percentage: number;
    timeTakenSeconds: number;
    createdAt: string;
  }>;
  stats: {
    totalAttended: number;
    averagePercentage: number;
    topPercentage: number;
    passPercentage: number;
  };
}

export class LeaderboardService {
  /**
   * Retrieves live, database-backed rankings from MongoDB & persistent storage.
   * Delivers authentic, real-time cohort rankings sorted strictly by marks and speed.
   */
  static async getLeaderboard(filter: LeaderboardFilter): Promise<LeaderboardResponse> {
    const query: any = {};

    if (filter.testCode && filter.testCode !== 'all') {
      query.testCode = filter.testCode.trim().toUpperCase();
    }

    if (filter.topicId && filter.topicId !== 'all') {
      query.topicId = filter.topicId.trim();
    }

    if (filter.subjectId && filter.subjectId !== 'all') {
      query.subjectId = filter.subjectId.trim();
    }

    if (filter.department && filter.department !== 'all') {
      query.studentDepartment = filter.department.trim();
    }

    // 1. Retrieve all attempts matching criteria from MongoDB (with safe error handling)
    let mongoAttempts: any[] = [];
    try {
      mongoAttempts = await Attempt.find(query)
        .sort({ percentage: -1, score: -1, timeTakenSeconds: 1, submittedAt: 1 })
        .lean();
    } catch (e) {
      console.warn('Notice: MongoDB attempt retrieval skipped in dual engine:', e);
    }

    // 2. Retrieve matching attempts from local database store
    const localAttempts = db.getAttempts() || [];
    const filteredLocal = localAttempts.filter((att: any) => {
      if (filter.testCode && filter.testCode !== 'all') {
        if (String(att.testCode || '').toUpperCase() !== filter.testCode.trim().toUpperCase()) return false;
      }
      if (filter.topicId && filter.topicId !== 'all') {
        if (att.topicId !== filter.topicId.trim()) return false;
      }
      if (filter.subjectId && filter.subjectId !== 'all') {
        if (att.subjectId !== filter.subjectId.trim()) return false;
      }
      if (filter.department && filter.department !== 'all') {
        if (att.studentDepartment !== filter.department.trim()) return false;
      }
      return true;
    });

    // 3. Merge MongoDB & local store, deduplicating by attempt id
    const mergedMap = new Map<string, any>();

    for (const att of (localAttempts as any[]).concat(mongoAttempts)) {
      const attId = String(att._id || att.id || '');
      if (attId && !mergedMap.has(attId)) {
        mergedMap.set(attId, att);
      }
    }

    const allCombined = Array.from(mergedMap.values());

    // 4. Deduplicate: Best attempt per student per testCode or topic
    const bestAttemptMap = new Map<string, any>();

    for (const att of allCombined) {
      if (
        att.studentRoll?.toLowerCase().includes('demo') ||
        att.studentName?.toLowerCase().includes('demo') ||
        att.testCode?.toLowerCase().includes('demo') ||
        String(att._id || '').toLowerCase().includes('real-') ||
        String(att._id || '').toLowerCase().includes('demo')
      ) {
        continue;
      }
      // Keyed by student roll and testCode/topic
      const scopeKey = filter.testCode ? String(att.testCode || '').toUpperCase() : (att.topicId || 'general');
      const studentKey = String(att.studentRoll || '').trim().toUpperCase();
      const key = `${studentKey}-${scopeKey}`;

      const attPct = att.percentage ?? Math.round((att.score / Math.max(1, att.total)) * 100);
      const existing = bestAttemptMap.get(key);

      if (!existing) {
        bestAttemptMap.set(key, { ...att, percentage: attPct });
      } else {
        const existPct = existing.percentage ?? Math.round((existing.score / Math.max(1, existing.total)) * 100);
        if (
          attPct > existPct ||
          (attPct === existPct && (att.score || 0) > (existing.score || 0)) ||
          (attPct === existPct && (att.timeTakenSeconds || 9999) < (existing.timeTakenSeconds || 9999))
        ) {
          bestAttemptMap.set(key, { ...att, percentage: attPct });
        }
      }
    }

    const uniqueAttempts = Array.from(bestAttemptMap.values());

    // 5. Deterministic Cohort Ranking Sort:
    // 1st: Percentage DESC (Marks)
    // 2nd: Raw Score DESC
    // 3rd: Time Taken ASC (Speed tie-breaker)
    // 4th: Submitted Date ASC
    uniqueAttempts.sort((a, b) => {
      if (b.percentage !== a.percentage) return b.percentage - a.percentage;
      if (b.score !== a.score) return b.score - a.score;
      const timeA = a.timeTakenSeconds || 300;
      const timeB = b.timeTakenSeconds || 300;
      if (timeA !== timeB) return timeA - timeB;
      return new Date(a.submittedAt || a.createdAt || 0).getTime() - new Date(b.submittedAt || b.createdAt || 0).getTime();
    });

    const entries = uniqueAttempts.map((a, index) => ({
      rank: index + 1,
      attemptId: a._id ? a._id.toString() : a.id,
      studentName: a.studentName,
      studentRoll: a.studentRoll,
      studentEmail: a.studentEmail || `${a.studentRoll.toLowerCase()}@kongu.edu`,
      studentDepartment: a.studentDepartment || 'Engineering',
      testCode: a.testCode,
      topicId: a.topicId,
      topicName: a.topicName || a.topicId,
      bloomLevel: a.bloomLevel || 'Apply',
      score: a.score,
      total: a.total,
      percentage: a.percentage,
      timeTakenSeconds: a.timeTakenSeconds || 0,
      createdAt: typeof a.submittedAt === 'object' && a.submittedAt?.toISOString
        ? a.submittedAt.toISOString()
        : typeof a.createdAt === 'string'
        ? a.createdAt
        : a.createdAt?.toISOString
        ? a.createdAt.toISOString()
        : new Date().toISOString(),
    }));

    const totalAttended = entries.length;
    const avgPct = totalAttended > 0 ? Math.round(entries.reduce((sum, e) => sum + e.percentage, 0) / totalAttended) : 0;
    const topPct = totalAttended > 0 ? entries[0].percentage : 0;
    const passCount = entries.filter((e) => e.percentage >= 50).length;
    const passRate = totalAttended > 0 ? Math.round((passCount / totalAttended) * 100) : 0;

    return {
      entries,
      stats: {
        totalAttended,
        averagePercentage: avgPct,
        topPercentage: topPct,
        passPercentage: passRate,
      },
    };
  }
}
