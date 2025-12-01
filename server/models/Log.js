import mongoose from 'mongoose';

// Log Schema - Based on Data Dictionary 7.2.3
const logSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    logNumber: {
      type: Number,
      required: true,
      min: 1,
      max: 24,
    },
    tasksCompleted: {
      type: String,
      required: [true, 'Tasks completed is required'],
      minlength: [50, 'Tasks description must be at least 50 characters'],
    },
    nextWeekPlan: {
      type: String,
      required: [true, 'Next week plan is required'],
      minlength: [50, 'Plan must be at least 50 characters'],
    },
    meetingDuration: {
      type: Number,
      required: true,
      min: 0,
      comment: 'Duration in minutes',
    },
    discussionPoints: {
      type: String,
      required: [true, 'Discussion points are required'],
    },
    attachments: [{
      filename: String,
      url: String,
      size: Number,
      uploadedAt: Date,
    }],
    status: {
      type: String,
      enum: ['pending', 'signed', 'rejected', 'needs_info'],
      default: 'pending',
    },
    studentSubmittedAt: {
      type: Date,
      default: Date.now,
    },
    supervisorSignedAt: Date,
    supervisorSignature: String, // Digital signature hash (timestamp + supervisor ID)
    supervisorFeedback: String,
    weekStartDate: Date,
    weekEndDate: Date,
  },
  {
    timestamps: true,
  }
);

// Compound index to prevent duplicate logs (FR-2.5)
logSchema.index({ projectId: 1, logNumber: 1 }, { unique: true });
logSchema.index({ projectId: 1, status: 1 });

// Method to generate digital signature (FR-2.7)
logSchema.methods.generateSignature = async function (supervisorId) {
  const crypto = await import('crypto');
  const data = `${this._id}-${this.logNumber}-${Date.now()}-${supervisorId}`;
  return crypto.default.createHash('sha256').update(data).digest('hex');
};

// Method to sign log (UC-11)
logSchema.methods.signLog = async function (supervisorId) {
  this.status = 'signed';
  this.supervisorSignedAt = new Date();
  this.supervisorSignature = await this.generateSignature(supervisorId);
  return this.save();
};

const Log = mongoose.model('Log', logSchema);

export default Log;
