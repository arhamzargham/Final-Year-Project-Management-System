import express from 'express';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get all supervisors (for proposal submission)
router.get('/supervisors', authenticateToken, async (req, res) => {
  try {
    const supervisors = await User.find({
      role: 'supervisor',
      isVerified: true,
    }).select('name email researchDomains currentSupervisionCount supervisorQuota');

    const availableSupervisors = supervisors.map((sup) => ({
      id: sup._id,
      name: sup.name,
      email: sup.email,
      domains: sup.researchDomains || [],
      currentLoad: `${sup.currentSupervisionCount}/${sup.supervisorQuota}`,
      isAvailable: sup.currentSupervisionCount < sup.supervisorQuota,
    }));

    res.json({
      success: true,
      data: availableSupervisors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch supervisors',
    });
  }
});

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-passwordHash');
    
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile',
    });
  }
});

// UC-36: Change Password
router.put('/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);
    
    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    // Update password
    user.passwordHash = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update password',
    });
  }
});

export default router;
