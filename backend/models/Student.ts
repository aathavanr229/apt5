import mongoose, { Document, Schema } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  rollNumber: string;
  email: string;
  department: string;
  passwordHash: string;
  isInstitutionalEmail: boolean;
  emailVerified: boolean;
  verificationCode?: string;
  verificationCodeExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema = new Schema<IStudent>(
  {
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    rollNumber: {
      type: String,
      required: [true, 'Roll or registration number is required'],
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true,
      default: 'Computer Science & Engineering',
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required'],
      select: false, // Never return password hash in regular queries
    },
    isInstitutionalEmail: {
      type: Boolean,
      default: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      select: false,
    },
    verificationCodeExpires: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        delete ret.passwordHash;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Prevent re-compilation during hot-reloads/serverless invocations
export const Student =
  (mongoose.models.Student as mongoose.Model<IStudent>) ||
  mongoose.model<IStudent>('Student', StudentSchema);
