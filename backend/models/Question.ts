import mongoose, { Document, Schema } from 'mongoose';

export interface IQuestion extends Document {
  customId: string;
  topicId: string;
  subjectId: string;
  bloomLevel: string;
  qtype: 'mcq' | 'short';
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  approved: boolean;
  syllabusUnit?: string;
  learningOutcomes?: string;
  source?: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema = new Schema<IQuestion>(
  {
    customId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    topicId: {
      type: String,
      required: [true, 'Topic ID is required'],
      index: true,
    },
    subjectId: {
      type: String,
      required: [true, 'Subject ID is required'],
      default: 'subj-aptitude',
      index: true,
    },
    bloomLevel: {
      type: String,
      required: [true, 'Bloom level is required'],
      index: true,
    },
    qtype: {
      type: String,
      enum: ['mcq', 'short'],
      required: true,
      default: 'mcq',
    },
    questionText: {
      type: String,
      required: [true, 'Question text is required'],
      trim: true,
    },
    options: {
      type: [String],
      default: [],
    },
    correctAnswer: {
      type: String,
      required: [true, 'Correct answer is required'],
      trim: true,
    },
    explanation: {
      type: String,
      default: '',
    },
    approved: {
      type: Boolean,
      default: false,
      index: true,
    },
    syllabusUnit: {
      type: String,
      default: '',
    },
    learningOutcomes: {
      type: String,
      default: '',
    },
    source: {
      type: String,
      enum: ['ai', 'bank', 'book', 'manual', 'mock'],
      default: 'bank',
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for optimized filtering
QuestionSchema.index({ topicId: 1, approved: 1, bloomLevel: 1 });

export const Question =
  (mongoose.models.Question as mongoose.Model<IQuestion>) ||
  mongoose.model<IQuestion>('Question', QuestionSchema);
