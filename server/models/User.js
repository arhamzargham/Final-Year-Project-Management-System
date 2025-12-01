import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// User Schema - Based on Data Dictionary 7.2.1
const userSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      unique: true,
      sparse: true, // Allows null for non-students
      match: /^[0-9]{2}-[0-9]{3}-[0-9]{3}$/, // Format: XX-XXX-XXX
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [/^[^\s@]+@bu\.edu\.pk$/, 'Please use university email (@bu.edu.pk)'],
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 60, // bcrypt hash length
    },
    role: {
      type: String,
      required: true,
      enum: ['student', 'supervisor', 'coordinator', 'evaluator', 'hod'],
      default: 'student',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    verificationTokenExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: Date,
    lastLoginAt: Date,
    // Supervisor-specific fields
    supervisorQuota: {
      type: Number,
      default: 5,
      min: 0,
    },
    currentSupervisionCount: {
      type: Number,
      default: 0,
    },
    researchDomains: [String],
    // Evaluator-specific fields
    expertise: [String],
    isExternal: Boolean,
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Virtual for checking if account is locked (SEC-4)
userSchema.virtual('isLocked').get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Pre-save hook to hash password (SEC-1)
userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next();

  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS) || 10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.passwordHash);
};

// Method to increment login attempts (SEC-4)
userSchema.methods.incLoginAttempts = function () {
  // If lock has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 },
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  const maxAttempts = 5;
  const lockTime = 30 * 60 * 1000; // 30 minutes

  // Lock account after max attempts
  if (this.loginAttempts + 1 >= maxAttempts && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + lockTime };
  }
  
  return this.updateOne(updates);
};

// Method to reset login attempts
userSchema.methods.resetLoginAttempts = function () {
  return this.updateOne({
    $set: { loginAttempts: 0 },
    $unset: { lockUntil: 1 },
  });
};

const User = mongoose.model('User', userSchema);

export default User;
