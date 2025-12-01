import mongoose from 'mongoose';

// Defense Schema - Based on Data Dictionary 7.2.4
const defenseSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    defenseType: {
      type: String,
      enum: ['mid_term', 'final'],
      required: true,
    },
    scheduledDate: {
      type: Date,
      required: true,
    },
    scheduledTime: {
      startTime: String, // Format: "HH:MM"
      endTime: String,
    },
    room: {
      type: String,
      required: true,
    },
    building: {
      type: String,
      default: 'H-11',
    },
    supervisorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    internalEvaluatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    externalEvaluatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Evaluation scores based on rubric (FR-4.2)
    supervisorEvaluation: {
      presentationScore: { type: Number, min: 0, max: 20 },
      demoScore: { type: Number, min: 0, max: 40 },
      qaScore: { type: Number, min: 0, max: 20 },
      reportScore: { type: Number, min: 0, max: 20 },
      totalScore: { type: Number, min: 0, max: 100 },
      remarks: String,
      submittedAt: Date,
    },
    internalEvaluation: {
      presentationScore: { type: Number, min: 0, max: 20 },
      demoScore: { type: Number, min: 0, max: 40 },
      qaScore: { type: Number, min: 0, max: 20 },
      reportScore: { type: Number, min: 0, max: 20 },
      totalScore: { type: Number, min: 0, max: 100 },
      remarks: String,
      submittedAt: Date,
    },
    externalEvaluation: {
      presentationScore: { type: Number, min: 0, max: 20 },
      demoScore: { type: Number, min: 0, max: 40 },
      qaScore: { type: Number, min: 0, max: 20 },
      reportScore: { type: Number, min: 0, max: 20 },
      totalScore: { type: Number, min: 0, max: 100 },
      remarks: String,
      submittedAt: Date,
    },
    aggregatedScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    status: {
      type: String,
      enum: ['scheduled', 'in_progress', 'completed', 'cancelled'],
      default: 'scheduled',
    },
    gradeStatus: {
      type: String,
      enum: ['pending', 'submitted', 'approved', 'published'],
      default: 'pending',
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    approvedAt: Date,
    notes: String,
  },
  {
    timestamps: true,
  }
);

// Indexes
defenseSchema.index({ scheduledDate: 1, room: 1 });
defenseSchema.index({ projectId: 1 });
defenseSchema.index({ status: 1 });

// Method to calculate aggregated score (FR-4.8)
defenseSchema.methods.calculateAggregatedScore = function () {
  const scores = [];
  
  if (this.supervisorEvaluation?.totalScore !== undefined) {
    scores.push(this.supervisorEvaluation.totalScore);
  }
  if (this.internalEvaluation?.totalScore !== undefined) {
    scores.push(this.internalEvaluation.totalScore);
  }
  if (this.externalEvaluation?.totalScore !== undefined) {
    scores.push(this.externalEvaluation.totalScore);
  }

  if (scores.length === 0) return null;
  
  // Average of all evaluations
  this.aggregatedScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  return this.aggregatedScore;
};

// Method to auto-calculate total score for evaluation
defenseSchema.statics.calculateTotalScore = function (evaluation) {
  return (
    (evaluation.presentationScore || 0) +
    (evaluation.demoScore || 0) +
    (evaluation.qaScore || 0) +
    (evaluation.reportScore || 0)
  );
};

const Defense = mongoose.model('Defense', defenseSchema);

export default Defense;
