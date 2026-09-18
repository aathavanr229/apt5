import mongoose, { Document, Schema } from 'mongoose';

export interface ITestSessionQuestion {
  id: string;
  topicId: string;
  bloomLevel: string;
  qtype: 'mcq' | 'short';
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface ITestSession extends Document {
  testCode: string;
  topicId: string;
  topicName: string;
  subjectId: string;
  bloomLevel: string;
  bloomLevels: string[];
  sourceMode: string;
  count: number;
  questions: ITestSessionQuestion[];
  createdByStudentId?: mongoose.Types.ObjectId;
  createdAt: Date;
  expiresAt?: Date;
}

const TestSessionSchema = new Schema<ITestSession>(
  {
    testCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    topicId: {
      type: String,
      required: true,
      index: true,
    },
    topicName: {
      type: String,
      required: true,
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
    bloomLevels: {
      type: [String],
      default: ['Apply'],
    },
    sourceMode: {
      type: String,
      default: 'ai',
    },
    count: {
      type: Number,
      required: true,
    },
    questions: [
      {
        id: { type: String, required: true },
        topicId: { type: String, required: true },
        bloomLevel: { type: String, required: true },
        qtype: { type: String, enum: ['mcq', 'short'], required: true },
        questionText: { type: String, required: true },
        options: { type: [String], default: [] },
        correctAnswer: { type: String, required: true },
        explanation: { type: String, default: '' },
      },
    ],
    createdByStudentId: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: false,
    },
    expiresAt: {
      type: Date,
      index: { expires: '7d' }, // Automatically cleans up older test sessions after 7 days
    },
  },
  {
    timestamps: true,
  }
);

export const TestSession =
  (mongoose.models.TestSession as mongoose.Model<ITestSession>) ||
  mongoose.model<ITestSession>('TestSession', TestSessionSchema);
