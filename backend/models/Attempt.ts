import mongoose, { Document, Schema } from 'mongoose';

export interface IAttemptAnswer {
  questionId: string;
  questionText: string;
  qtype: 'mcq' | 'short';
  options: string[];
  userAnswer: string;
  correctAnswer: string;
  correct: boolean;
  explanation: string;
  graderReason?: string;
}

export interface IAttempt extends Document {
  studentId: mongoose.Types.ObjectId;
  studentName: string;
  studentRoll: string;
  studentEmail?: string;
  studentDepartment?: string;
  testCode: string;
  topicId: string;
  topicName: string;
  subjectId: string;
  bloomLevel: string;
  score: number;
  total: number;
  percentage: number;
  timeTakenSeconds: number;
  bloomBreakdown?: Record<string, { score: number; total: number }>;
  answers: IAttemptAnswer[];
  submittedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AttemptSchema = new Schema<IAttempt>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
      index: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    studentRoll: {
      type: String,
      required: true,
      uppercase: true,
      index: true,
    },
    studentEmail: {
      type: String,
      lowercase: true,
    },
    studentDepartment: {
      type: String,
      default: 'Engineering',
    },
    testCode: {
      type: String,
      required: true,
      uppercase: true,
      index: true,
    },
    topicId: {
      type: String,
      required: true,
      index: true,
    },
    topicName: {
      type: String,
      default: 'Aptitude Test',
    },
    subjectId: {
      type: String,
      default: 'subj-aptitude',
      index: true,
    },
    bloomLevel: {
      type: String,
      default: 'Apply',
    },
    score: {
      type: Number,
      required: true,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 1,
    },
    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    timeTakenSeconds: {
      type: Number,
      default: 0,
    },
    bloomBreakdown: {
      type: Schema.Types.Mixed,
      default: {},
    },
    answers: [
      {
        questionId: { type: String, required: true },
        questionText: { type: String, required: true },
        qtype: { type: String, enum: ['mcq', 'short'], required: true },
        options: { type: [String], default: [] },
        userAnswer: { type: String, default: '' },
        correctAnswer: { type: String, required: true },
        correct: { type: Boolean, required: true },
        explanation: { type: String, default: '' },
        graderReason: { type: String, default: '' },
      },
    ],
    submittedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// High-performance compound indexes for leaderboards
AttemptSchema.index({ testCode: 1, percentage: -1, timeTakenSeconds: 1 });
AttemptSchema.index({ topicId: 1, percentage: -1, timeTakenSeconds: 1 });
AttemptSchema.index({ studentId: 1, submittedAt: -1 });

export const Attempt =
  (mongoose.models.Attempt as mongoose.Model<IAttempt>) ||
  mongoose.model<IAttempt>('Attempt', AttemptSchema);
