import mongoose from 'mongoose';

// Project Schema - Based on Data Dictionary 7.2.2
const projectSchema = new mongoose.Schema(
  {
    projectCode: {
      type: String,
      unique: true,
      required: true,
      match: /^[0-9]{4}-[A-Z]+-[0-9]{3}$/, // Format: YYYY-DEPT-###
    },
    title: {
      type: String,
      required: [true, 'Project title is required'],
      maxlength: [150, 'Title cannot exceed 150 characters'],
      trim: true,
    },
    abstract: {
      type: String,
      required: [true, 'Abstract is required'],
      minlength: [50, 'Abstract must be at least 50 words'],
      maxlength: [2000, 'Abstract cannot exceed 2000 characters'],
    },
    domain: {
      type: String,
      required: true,
      enum: ['AI', 'IoT', 'Web Development', 'Blockchain', 'Cybersecurity', 'Data Science'],
    },
    studentIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }],
    supervisorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    currentPhase: {
      type: String,
      enum: ['proposal', 'srs', 'execution', 'defense', 'completed'],
      default: 'proposal',
    },
    proposalStatus: {
      type: String,
      enum: ['draft', 'submitted', 'under_review', 'approved', 'rejected', 'needs_revision'],
      default: 'draft',
    },
    proposalSubmittedAt: Date,
    proposalReviewedAt: Date,
    proposalFeedback: String,
    proposalSignature: String, // SHA-256 hash
    srsStatus: {
      type: String,
      enum: ['not_started', 'uploaded', 'pending_approval', 'approved', 'needs_revision'],
      default: 'not_started',
    },
    srsFileUrl: String,
    srsUploadedAt: Date,
    srsApprovedAt: Date,
    srsSignature: String,
    sdsStatus: {
      type: String,
      enum: ['not_started', 'uploaded', 'pending_approval', 'approved', 'needs_revision'],
      default: 'not_started',
    },
    sdsFileUrl: String,
    sdsUploadedAt: Date,
    logCount: {
      type: Number,
      default: 0,
      min: 0,
      max: 24,
    },
    defenseEligible: {
      type: Boolean,
      default: false,
    },
    defenseScheduled: {
      type: Boolean,
      default: false,
    },
    plagiarismScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    plagiarismReportUrl: String,
    thesisFileUrl: String,
    thesisUploadedAt: Date,
    finalGrade: {
      type: Number,
      min: 0,
      max: 100,
    },
    letterGrade: String,
    monthlyEvaluations: [{
      month: Number,
      year: Number,
      score: {
        type: Number,
        min: 0,
        max: 100,
      },
      feedback: String,
      submittedAt: Date,
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance (DB-2)
projectSchema.index({ projectCode: 1 });
projectSchema.index({ supervisorId: 1 });
projectSchema.index({ studentIds: 1 });
projectSchema.index({ currentPhase: 1 });
projectSchema.index({ defenseEligible: 1 });

// Virtual to check defense eligibility (FR-3.1)
projectSchema.virtual('canRegisterDefense').get(function () {
  return (
    this.logCount >= 24 &&
    this.srsStatus === 'approved' &&
    this.plagiarismScore !== undefined &&
    this.plagiarismScore < 20
  );
});

// Method to generate project code (FR-1.5)
projectSchema.statics.generateProjectCode = async function () {
  const year = new Date().getFullYear();
  const dept = 'CS'; // Computer Science
  
  // Find the latest project code for this year
  const latestProject = await this.findOne({
    projectCode: new RegExp(`^${year}-${dept}-`),
  }).sort({ projectCode: -1 });

  let nextNumber = 1;
  if (latestProject) {
    const match = latestProject.projectCode.match(/-(\d{3})$/);
    if (match) {
      nextNumber = parseInt(match[1]) + 1;
    }
  }

  return `${year}-${dept}-${String(nextNumber).padStart(3, '0')}`;
};

// Method to update defense eligibility
projectSchema.methods.updateDefenseEligibility = function () {
  this.defenseEligible = this.canRegisterDefense;
  return this.save();
};

const Project = mongoose.model('Project', projectSchema);

export default Project;
