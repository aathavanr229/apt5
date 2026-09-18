import fs from 'fs';
import path from 'path';
import { Subject, Topic, Question, Attempt, StudentUser } from '../src/types.js';

const DB_FILE = path.join(process.cwd(), 'db.json');
const TMP_DB_FILE = path.join('/tmp', 'db.json');

interface DatabaseSchema {
  subjects: Subject[];
  topics: Topic[];
  questions: Question[];
  attempts: Attempt[];
  users: StudentUser[];
}

import { COMPREHENSIVE_TOPICS } from './topicsData.js';
const DEFAULT_USERS: StudentUser[] = [];

const DEFAULT_ATTEMPTS: Attempt[] = [];


const DEFAULT_SUBJECTS: Subject[] = [
  {
    id: 'subj-aptitude',
    name: 'Quantitative Aptitude',
    code: 'QA101',
    summary: 'Master the core mathematical and logical concepts required for technical assessments, entrance examinations, and high-performance problem solving. This course covers everything from simple ratios to complex probability.',
    department: 'General Engineering / Placement Cell',
    status: 'active'
  },
  {
    id: 'subj-maths',
    name: 'Engineering Mathematics',
    code: 'MA3151',
    summary: 'Linear algebra, calculus, differential equations, Fourier series, and numerical methods crucial for all engineering streams.',
    department: 'Mathematics',
    status: 'coming_soon'
  },
  {
    id: 'subj-dbms',
    name: 'Database Management Systems',
    code: 'CS3401',
    summary: 'Relational database design, SQL querying, transactional integrity, index strategies, and modern NoSQL architectures.',
    department: 'Computer Science and Engineering',
    status: 'coming_soon'
  },
  {
    id: 'subj-dsa',
    name: 'Data Structures & Algorithms',
    code: 'CS3301',
    summary: 'Asymptotic complexity analysis, linked structures, trees, graphs, sorting, searching, and advanced dynamic programming patterns.',
    department: 'Computer Science and Engineering',
    status: 'coming_soon'
  },
  {
    id: 'subj-os',
    name: 'Operating Systems',
    code: 'CS3402',
    summary: 'Process scheduling, synchronization, deadlock mitigation, memory virtualization, caching, and file system layouts.',
    department: 'Computer Science and Engineering',
    status: 'coming_soon'
  }
];

const DEFAULT_TOPICS: Topic[] = COMPREHENSIVE_TOPICS;

class Database {
  private data: DatabaseSchema = {
    subjects: [],
    topics: [],
    questions: [],
    attempts: [],
    users: []
  };

  constructor() {
    this.load();
  }

  private load() {
    try {
      let targetFile = '';
      if (fs.existsSync(TMP_DB_FILE)) {
        targetFile = TMP_DB_FILE;
      } else if (fs.existsSync(DB_FILE)) {
        targetFile = DB_FILE;
      }

      if (targetFile) {
        const fileContent = fs.readFileSync(targetFile, 'utf-8');
        this.data = JSON.parse(fileContent);
        if (!this.data.subjects || this.data.subjects.length === 0) {
          this.data.subjects = DEFAULT_SUBJECTS;
        }
        this.data.topics = DEFAULT_TOPICS;
        // Purge any fake, mock, or demo attempts so leaderboard only shows real student attempts
        if (this.data.attempts) {
          this.data.attempts = this.data.attempts.filter(a => 
            !a.id?.toLowerCase().includes('demo') && 
            !a.id?.toLowerCase().includes('real-') &&
            !a.studentRoll?.toLowerCase().includes('demo') &&
            !a.testCode?.toLowerCase().includes('demo')
          );
        } else {
          this.data.attempts = [];
        }
        if (!this.data.users || this.data.users.length === 0) {
          this.data.users = DEFAULT_USERS;
        }
      } else {
        this.data = {
          subjects: DEFAULT_SUBJECTS,
          topics: DEFAULT_TOPICS,
          questions: [],
          attempts: DEFAULT_ATTEMPTS,
          users: DEFAULT_USERS
        };
        this.save();
      }
    } catch (e) {
      console.warn('Notice: Loading in-memory database defaults:', e);
      this.data = {
        subjects: DEFAULT_SUBJECTS,
        topics: DEFAULT_TOPICS,
        questions: [],
        attempts: DEFAULT_ATTEMPTS,
        users: DEFAULT_USERS
      };
    }
  }

  private save() {
    const jsonStr = JSON.stringify(this.data, null, 2);
    try {
      fs.writeFileSync(TMP_DB_FILE, jsonStr, 'utf-8');
    } catch {
      try {
        fs.writeFileSync(DB_FILE, jsonStr, 'utf-8');
      } catch {
        // In-memory fallback if all filesystems are restricted
      }
    }
  }

  // Users Auth (Email or Roll Number)
  getUsers(): StudentUser[] {
    this.load();
    return this.data.users || [];
  }

  getUserByRoll(roll: string): StudentUser | undefined {
    this.load();
    const cleanRoll = roll.trim().toUpperCase();
    return this.data.users.find(u => u.roll.toUpperCase() === cleanRoll);
  }

  getUserByIdentifier(identifier: string): StudentUser | undefined {
    this.load();
    const clean = identifier.trim().toLowerCase();
    return this.data.users.find(u => 
      u.roll.toLowerCase() === clean || 
      (u.email && u.email.toLowerCase() === clean)
    );
  }

  createUser(user: Omit<StudentUser, 'id' | 'createdAt'>): StudentUser {
    this.load();
    const cleanRoll = user.roll.trim().toUpperCase();
    const cleanEmail = user.email ? user.email.trim().toLowerCase() : `${cleanRoll.toLowerCase()}@kongu.edu`;

    const existingRoll = this.data.users.find(u => u.roll.toUpperCase() === cleanRoll);
    if (existingRoll) {
      throw new Error(`Student account with Roll Number ${cleanRoll} already exists! Please Log In instead.`);
    }

    if (user.email) {
      const existingEmail = this.data.users.find(u => u.email && u.email.toLowerCase() === cleanEmail);
      if (existingEmail) {
        throw new Error(`Account with email address ${user.email} is already registered! Please Log In.`);
      }
    }

    const newUser: StudentUser = {
      ...user,
      id: `usr-${Date.now()}`,
      roll: cleanRoll,
      email: cleanEmail,
      createdAt: new Date().toISOString()
    };
    this.data.users.push(newUser);
    this.save();
    return newUser;
  }

  // Subjects
  getSubjects(): Subject[] {
    this.load();
    return this.data.subjects;
  }

  // Topics
  getTopics(subjectId?: string): Topic[] {
    this.load();
    if (subjectId) {
      return this.data.topics.filter(t => t.subjectId === subjectId);
    }
    return this.data.topics;
  }

  getTopicById(id: string): Topic | undefined {
    this.load();
    return this.data.topics.find(t => t.id === id);
  }

  // Questions
  getQuestions(): Question[] {
    this.load();
    return this.data.questions;
  }

  getQuestionsByFilters(filters: { topicId?: string; bloomLevel?: string; approved?: boolean }): Question[] {
    this.load();
    let list = this.data.questions;
    if (filters.topicId) {
      list = list.filter(q => q.topicId === filters.topicId);
    }
    if (filters.bloomLevel) {
      const levels = filters.bloomLevel.split(',').map(l => l.trim().toLowerCase());
      list = list.filter(q => levels.includes(q.bloomLevel.toLowerCase()));
    }
    if (filters.approved !== undefined) {
      list = list.filter(q => q.approved === filters.approved);
    }
    return list;
  }

  addQuestions(questions: Question[]) {
    this.load();
    this.data.questions.push(...questions);
    this.save();
  }

  approveQuestion(id: string): boolean {
    this.load();
    const idx = this.data.questions.findIndex(q => q.id === id);
    if (idx !== -1) {
      this.data.questions[idx].approved = true;
      this.save();
      return true;
    }
    return false;
  }

  updateQuestion(id: string, updated: Partial<Question>): boolean {
    this.load();
    const idx = this.data.questions.findIndex(q => q.id === id);
    if (idx !== -1) {
      this.data.questions[idx] = {
        ...this.data.questions[idx],
        ...updated
      };
      this.save();
      return true;
    }
    return false;
  }

  deleteQuestion(id: string): boolean {
    this.load();
    const len = this.data.questions.length;
    this.data.questions = this.data.questions.filter(q => q.id !== id);
    if (this.data.questions.length < len) {
      this.save();
      return true;
    }
    return false;
  }

  // Attempts
  getAttempts(filters?: { topicId?: string; subjectId?: string; testCode?: string; department?: string }): Attempt[] {
    this.load();
    let list = (this.data.attempts || []).filter(a => 
      !a.id?.toLowerCase().includes('demo') && 
      !a.id?.toLowerCase().includes('real-') && 
      !a.studentRoll?.toLowerCase().includes('demo') &&
      !a.testCode?.toLowerCase().includes('demo')
    );
    if (filters?.topicId && filters.topicId !== 'all') {
      list = list.filter(a => a.topicId === filters.topicId);
    }
    if (filters?.subjectId && filters.subjectId !== 'all') {
      list = list.filter(a => a.subjectId === filters.subjectId);
    }
    if (filters?.testCode && filters.testCode !== 'all') {
      list = list.filter(a => a.testCode?.toUpperCase() === filters.testCode?.toUpperCase());
    }
    if (filters?.department && filters.department !== 'all') {
      list = list.filter(a => a.studentDepartment?.toLowerCase() === filters.department?.toLowerCase());
    }
    return list;
  }

  getAttemptById(id: string): Attempt | undefined {
    this.load();
    return this.data.attempts.find(a => a.id === id);
  }

  addAttempt(attempt: Attempt) {
    this.load();
    this.data.attempts.push(attempt);
    this.save();
  }

  // Leaderboard & Rank Calculation
  getLeaderboard(topicId?: string, subjectId?: string, testCode?: string, department?: string) {
    this.load();
    let attempts = this.getAttempts({ topicId, subjectId, testCode, department });

    // Deduplicate by student (best attempt per student per topic, or latest attempt)
    // To rank all attending candidates accurately:
    const bestAttemptMap = new Map<string, Attempt>();

    for (const att of attempts) {
      const key = `${att.studentRoll}-${att.topicId}`;
      const existing = bestAttemptMap.get(key);
      const attPct = att.percentage || Math.round((att.score / Math.max(1, att.total)) * 100);

      if (!existing) {
        bestAttemptMap.set(key, { ...att, percentage: attPct });
      } else {
        const existPct = existing.percentage || Math.round((existing.score / Math.max(1, existing.total)) * 100);
        if (attPct > existPct || (attPct === existPct && (att.timeTakenSeconds || 9999) < (existing.timeTakenSeconds || 9999))) {
          bestAttemptMap.set(key, { ...att, percentage: attPct });
        }
      }
    }

    const uniqueAttempts = Array.from(bestAttemptMap.values());

    // Sort by Percentage DESC, Score DESC, TimeTaken ASC, Date ASC
    uniqueAttempts.sort((a, b) => {
      const pctA = a.percentage || Math.round((a.score / Math.max(1, a.total)) * 100);
      const pctB = b.percentage || Math.round((b.score / Math.max(1, b.total)) * 100);
      if (pctB !== pctA) return pctB - pctA;
      if (b.score !== a.score) return b.score - a.score;
      const timeA = a.timeTakenSeconds || 300;
      const timeB = b.timeTakenSeconds || 300;
      if (timeA !== timeB) return timeA - timeB;
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    const entries = uniqueAttempts.map((a, index) => {
      const topic = this.getTopicById(a.topicId);
      return {
        rank: index + 1,
        attemptId: a.id,
        studentName: a.studentName,
        studentRoll: a.studentRoll,
        studentEmail: a.studentEmail || `${a.studentRoll.toLowerCase()}@kongu.edu`,
        studentDepartment: a.studentDepartment || 'Engineering',
        topicId: a.topicId,
        topicName: a.topicName || topic?.name || a.topicId,
        bloomLevel: a.bloomLevel,
        score: a.score,
        total: a.total,
        percentage: a.percentage || Math.round((a.score / Math.max(1, a.total)) * 100),
        timeTakenSeconds: a.timeTakenSeconds || 180,
        createdAt: a.createdAt
      };
    });

    const totalAttended = entries.length;
    const avgPct = totalAttended > 0 ? Math.round(entries.reduce((sum, e) => sum + e.percentage, 0) / totalAttended) : 0;
    const topPct = totalAttended > 0 ? entries[0].percentage : 0;
    const passCount = entries.filter(e => e.percentage >= 50).length;
    const passRate = totalAttended > 0 ? Math.round((passCount / totalAttended) * 100) : 0;

    return {
      entries,
      stats: {
        totalAttended,
        averagePercentage: avgPct,
        topPercentage: topPct,
        passPercentage: passRate
      }
    };
  }
}

export const db = new Database();

