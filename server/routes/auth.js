import express from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import { sendEmail } from '../utils/email.js';

const router = express.Router();

// Helper function to generate JWT (FR-6.9)
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  });
};

// UC-01: Register Account
router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required')
      .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),
    body('email')
      .isEmail().withMessage('Invalid email address')
      .matches(/@bu\.edu\.pk$/).withMessage('Please use university email (@bu.edu.pk)'),
    body('password')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
      .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
      .matches(/[0-9]/).withMessage('Password must contain at least one number'),
    body('role').isIn(['student', 'supervisor', 'coordinator', 'evaluator', 'hod'])
      .withMessage('Invalid role'),
    body('studentId').optional().matches(/^[0-9]{2}-[0-9]{3}-[0-9]{3}$/)
      .withMessage('Student ID must be in format XX-XXX-XXX'),
  ],
  async (req, res) => {
    try {
      // Validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { name, email, password, role, studentId } = req.body;

      // FR-6.4: Check if user already exists
      const existingUser = await User.findOne({
        $or: [{ email }, ...(studentId ? [{ studentId }] : [])],
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: existingUser.email === email
            ? 'An account with this email already exists'
            : 'An account with this Student ID already exists',
        });
      }

      // Generate verification token (FR-6.3)
      const verificationToken = crypto.randomBytes(32).toString('hex');
      const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      // Create user
      const user = new User({
        name,
        email,
        passwordHash: password, // Will be hashed by pre-save hook
        role,
        studentId: role === 'student' ? studentId : undefined,
        verificationToken,
        verificationTokenExpires,
      });

      await user.save();

      // Send verification email
      const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;
      await sendEmail({
        to: email,
        subject: 'Verify Your FYP Management Account',
        html: `
          <h2>Welcome to FYP Management System!</h2>
          <p>Hi ${name},</p>
          <p>Please click the link below to verify your email address:</p>
          <a href="${verificationUrl}">${verificationUrl}</a>
          <p>This link will expire in 24 hours.</p>
          <p>If you didn't create this account, please ignore this email.</p>
        `,
      });

      res.status(201).json({
        success: true,
        message: 'Account created successfully. Please check your email to verify your account.',
        data: {
          userId: user._id,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Registration failed. Please try again.',
      });
    }
  }
);

// Verify Email
router.get('/verify-email/:token', async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification token.',
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'Email verified successfully. You can now login.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Email verification failed.',
    });
  }
});

// Login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.',
        });
      }

      // SEC-4: Check if account is locked
      if (user.isLocked) {
        return res.status(423).json({
          success: false,
          message: 'Account is locked due to too many failed login attempts. Please try again in 30 minutes.',
        });
      }

      // Verify password
      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        await user.incLoginAttempts();
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.',
        });
      }

      if (!user.isVerified) {
        return res.status(403).json({
          success: false,
          message: 'Please verify your email before logging in.',
        });
      }

      // Reset login attempts on successful login
      await user.resetLoginAttempts();

      // Update last login
      user.lastLoginAt = new Date();
      await user.save();

      // Generate JWT token
      const token = generateToken(user._id);

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            studentId: user.studentId,
          },
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Login failed. Please try again.',
      });
    }
  }
);

// UC-37: Request Password Reset
router.post(
  '/forgot-password',
  [body('email').isEmail().withMessage('Invalid email')],
  async (req, res) => {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        // Don't reveal if email exists
        return res.json({
          success: true,
          message: 'If an account exists with this email, a password reset link will be sent.',
        });
      }

      // FR-6.5: Generate reset token (expires in 1 hour)
      const resetToken = crypto.randomBytes(32).toString('hex');
      user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
      user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      await user.save();

      // Send reset email
      const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
      await sendEmail({
        to: email,
        subject: 'Password Reset Request',
        html: `
          <h2>Password Reset Request</h2>
          <p>Hi ${user.name},</p>
          <p>You requested to reset your password. Click the link below:</p>
          <a href="${resetUrl}">${resetUrl}</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
        `,
      });

      res.json({
        success: true,
        message: 'If an account exists with this email, a password reset link will be sent.',
      });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to process request.',
      });
    }
  }
);

// UC-37: Reset Password
router.post(
  '/reset-password',
  [
    body('token').notEmpty().withMessage('Token is required'),
    body('password')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
      .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
      .matches(/[0-9]/).withMessage('Password must contain at least one number'),
  ],
  async (req, res) => {
    try {
      const { token, password } = req.body;

      const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

      const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Invalid or expired reset token.',
        });
      }

      // Update password (will be hashed by pre-save hook)
      user.passwordHash = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      res.json({
        success: true,
        message: 'Password reset successful. You can now login with your new password.',
      });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({
        success: false,
        message: 'Password reset failed.',
      });
    }
  }
);

export default router;
