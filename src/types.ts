export interface Formula {
  name: string;
  formula: string;
  note?: string;
}

export interface TopicComparison {
  relatedTopicName: string;
  keyDifference: string;
  points: { feature: string; topicA: string; topicB: string }[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  summary: string;
  department: string;
  status: 'active' | 'coming_soon';
}

export interface SpeedShortcut {
  method: string; // Fast calculation method / technique name
  title: string; // Quick title of trick
  rule: string;  // Mathematical principle
  example: string; // Real worked numerical example
  mentalStep: string; // Step-by-step mental math trick
}

export interface Topic {
  id: string;
  subjectId: string;
  name: string;
  category?: 'quantitative' | 'logical' | 'verbal' | 'mock';
  summary: string;
  syllabusUnit: string;
  learningOutcomes: string;
  formulas: Formula[];
  formulaCount: number;
  comparisons?: TopicComparison[];
  speedShortcuts?: SpeedShortcut[];
}

export interface Question {
  id: string;
  topicId: string;
  subjectId: string;
  bloomLevel: string;
  qtype: 'mcq' | 'short';
  questionText: string;
  options: string[]; // Empty if short-answer
  correctAnswer: string;
  explanation: string;
  approved: boolean;
  syllabusUnit?: string;
  learningOutcomes?: string;
  createdAt: string;
}

export interface AttemptAnswer {
  questionId: string;
  userAnswer: string;
  correct: boolean;
  qtype: 'mcq' | 'short';
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  graderReason?: string;
}

export interface Attempt {
  id: string;
  topicId: string;
  topicName?: string;
  subjectId?: string;
  testCode?: string;
  bloomLevel: string;
  studentName: string;
  studentRoll: string;
  studentEmail?: string;
  studentDepartment?: string;
  score: number;
  total: number;
  percentage?: number;
  timeTakenSeconds?: number;
  answers: AttemptAnswer[];
  createdAt: string;
}

export interface StudentUser {
  id: string;
  name: string;
  roll: string;
  email?: string;
  department: string;
  password?: string;
  emailVerified?: boolean;
  createdAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  attemptId: string;
  studentName: string;
  studentRoll: string;
  studentEmail?: string;
  studentDepartment?: string;
  topicId: string;
  topicName: string;
  bloomLevel: string;
  score: number;
  total: number;
  percentage: number;
  timeTakenSeconds: number;
  createdAt: string;
}

export interface LeaderboardStats {
  totalAttended: number;
  averagePercentage: number;
  topPercentage: number;
  passPercentage: number; // >= 50%
}

export type QuestionSourceMode = 'ai' | 'bank' | 'hybrid' | 'book';

export const BLOOM_LEVELS = [
  'Remember',
  'Understand',
  'Apply',
  'Analyze',
  'Evaluate',
  'Create'
] as const;

export type BloomLevelType = typeof BLOOM_LEVELS[number];

