import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import Log from '../models/Log.js';
import Project from '../models/Project.js';
import Notification from '../models/Notification.js';
import { sendEmail, emailTemplates } from '../utils/email.js';

const router = express.Router();

// UC-04: Submit Weekly Log
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { projectId, tasksCompleted, nextWeekPlan, meetingDuration, discussionPoints, weekStartDate } = req.body;

    // Verify project exists and user is member
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    if (!project.studentIds.includes(req.user._id)) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    // Get next log number
    const lastLog = await Log.findOne({ projectId }).sort({ logNumber: -1 });
    const logNumber = lastLog ? lastLog.logNumber + 1 : 1;

    if (logNumber > 24) {
      return res.status(400).json({
        success: false,
        message: 'Maximum 24 logs allowed',
      });
    }

    // Create log
    const log = new Log({
      projectId,
      logNumber,
      tasksCompleted,
      nextWeekPlan,
      meetingDuration,
      discussionPoints,
      weekStartDate: new Date(weekStartDate),
      status: 'pending',
    });

    await log.save();

    // Notify supervisor
    await Notification.create({
      userId: project.supervisorId,
      type: 'approval',
      title: `New Log #${logNumber} Submitted`,
      message: `${req.user.name} submitted Log #${logNumber} for ${project.title}`,
      relatedEntity: { entityType: 'log', entityId: log._id },
    });

    res.status(201).json({
      success: true,
      message: 'Log submitted successfully',
      data: log,
    });
  } catch (error) {
    console.error('Log submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit log',
    });
  }
});

// Get logs for a project
router.get('/project/:projectId', authenticateToken, async (req, res) => {
  try {
    const { projectId } = req.params;

    const logs = await Log.find({ projectId }).sort({ logNumber: 1 });

    res.json({
      success: true,
      data: logs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch logs',
    });
  }
});

// UC-11: Sign Weekly Log
router.patch('/:logId/sign', authenticateToken, async (req, res) => {
  try {
    const { logId } = req.params;

    const log = await Log.findById(logId).populate('projectId');
    if (!log) {
      return res.status(404).json({ success: false, message: 'Log not found' });
    }

    // Verify supervisor
    if (log.projectId.supervisorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    // Sign log
    const crypto = await import('crypto');
    const signatureData = `${log._id}-${log.logNumber}-${Date.now()}-${req.user._id}`;
    log.supervisorSignature = crypto.createHash('sha256').update(signatureData).digest('hex');
    log.status = 'signed';
    log.supervisorSignedAt = new Date();

    await log.save();

    // Update project log count
    const project = await Project.findById(log.projectId);
    project.logCount = await Log.countDocuments({
      projectId: log.projectId,
      status: 'signed',
    });
    await project.save();

    // Notify students
    for (const studentId of project.studentIds) {
      await Notification.create({
        userId: studentId,
        type: 'approval',
        title: `Log #${log.logNumber} Signed`,
        message: `Your supervisor signed Log #${log.logNumber}. Progress: ${project.logCount}/24`,
        relatedEntity: { entityType: 'log', entityId: log._id },
      });
    }

    res.json({
      success: true,
      message: 'Log signed successfully',
      data: log,
    });
  } catch (error) {
    console.error('Log signing error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to sign log',
    });
  }
});

export default router;
