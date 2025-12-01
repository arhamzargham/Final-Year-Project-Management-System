import express from 'express';
import { body, validationResult } from 'express-validator';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import Project from '../models/Project.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';
import { sendEmail, emailTemplates } from '../utils/email.js';

const router = express.Router();

// UC-02: Submit Project Proposal
router.post(
  '/',
  authenticateToken,
  authorizeRoles('student'),
  [
    body('title').trim().isLength({ min: 1, max: 150 }).withMessage('Title must be 1-150 characters'),
    body('abstract').trim().isLength({ min: 50, max: 2000 }).withMessage('Abstract must be 50-2000 characters'),
    body('domain').isIn(['AI', 'IoT', 'Web Development', 'Blockchain', 'Cybersecurity', 'Data Science']),
    body('supervisorId').isMongoId().withMessage('Invalid supervisor ID'),
    body('groupMembers').optional().isArray({ max: 2 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { title, abstract, domain, supervisorId, groupMembers = [] } = req.body;

      // FR-1.2: Check if student is eligible
      const existingProject = await Project.findOne({
        studentIds: req.user._id,
        isActive: true,
      });

      if (existingProject) {
        return res.status(400).json({
          success: false,
          message: 'You are already assigned to a project',
        });
      }

      // Check supervisor quota
      const supervisor = await User.findById(supervisorId);
      if (!supervisor || supervisor.role !== 'supervisor') {
        return res.status(400).json({
          success: false,
          message: 'Invalid supervisor',
        });
      }

      if (supervisor.currentSupervisionCount >= supervisor.supervisorQuota) {
        return res.status(400).json({
          success: false,
          message: 'Supervisor has reached maximum capacity',
        });
      }

      // Generate project code (FR-1.5)
      const projectCode = await Project.generateProjectCode();

      // Create project
      const project = new Project({
        projectCode,
        title,
        abstract,
        domain,
        supervisorId,
        studentIds: [req.user._id, ...groupMembers],
        proposalStatus: 'submitted',
        proposalSubmittedAt: new Date(),
      });

      await project.save();

      // Update supervisor count
      supervisor.currentSupervisionCount += 1;
      await supervisor.save();

      // Send notification to supervisor
      await Notification.create({
        userId: supervisorId,
        type: 'approval',
        title: 'New Proposal Submitted',
        message: `${req.user.name} submitted a new project proposal: ${title}`,
        relatedEntity: {
          entityType: 'project',
          entityId: project._id,
        },
        priority: 'normal',
      });

      // Send email to supervisor (FR-6.10)
      await sendEmail({
        to: supervisor.email,
        subject: 'New Project Proposal for Review',
        html: `
          <h2>New Proposal Submitted</h2>
          <p>Student: ${req.user.name}</p>
          <p>Project: ${title}</p>
          <p>Domain: ${domain}</p>
          <p>Please login to review and approve.</p>
        `,
      });

      res.status(201).json({
        success: true,
        message: 'Proposal submitted successfully',
        data: project,
      });
    } catch (error) {
      console.error('Proposal submission error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit proposal',
      });
    }
  }
);

// Get projects (filtered by user role)
router.get('/', authenticateToken, async (req, res) => {
  try {
    let query = { isActive: true };

    if (req.user.role === 'student') {
      query.studentIds = req.user._id;
    } else if (req.user.role === 'supervisor') {
      query.supervisorId = req.user._id;
    }
    // Coordinator and HOD see all projects

    const projects = await Project.find(query)
      .populate('supervisorId', 'name email')
      .populate('studentIds', 'name email studentId')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects',
    });
  }
});

// UC-10: Approve/Reject Proposal
router.patch(
  '/:projectId/proposal-decision',
  authenticateToken,
  authorizeRoles('supervisor'),
  async (req, res) => {
    try {
      const { projectId } = req.params;
      const { decision, feedback } = req.body; // decision: 'approve', 'reject', 'revise'

      const project = await Project.findById(projectId).populate('studentIds', 'name email');

      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found',
        });
      }

      if (project.supervisorId.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized',
        });
      }

      if (decision === 'approve') {
        // FR-1.8: Generate digital signature
        const crypto = await import('crypto');
        const signatureData = `${project._id}-${Date.now()}-${req.user._id}`;
        project.proposalSignature = crypto.createHash('sha256').update(signatureData).digest('hex');
        project.proposalStatus = 'approved';
        project.proposalReviewedAt = new Date();
        project.currentPhase = 'srs';

        // Notify students
        for (const student of project.studentIds) {
          await Notification.create({
            userId: student._id,
            type: 'approval',
            title: 'Proposal Approved!',
            message: `Your project proposal "${project.title}" has been approved.`,
            relatedEntity: { entityType: 'project', entityId: project._id },
            priority: 'high',
          });

          const emailContent = emailTemplates.proposalApproved(student.name, project.title);
          await sendEmail({
            to: student.email,
            ...emailContent,
          });
        }
      } else if (decision === 'reject') {
        project.proposalStatus = 'rejected';
        project.proposalFeedback = feedback;
        project.proposalReviewedAt = new Date();
      } else if (decision === 'revise') {
        project.proposalStatus = 'needs_revision';
        project.proposalFeedback = feedback;
      }

      await project.save();

      res.json({
        success: true,
        message: `Proposal ${decision}d successfully`,
        data: project,
      });
    } catch (error) {
      console.error('Proposal decision error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to process decision',
      });
    }
  }
);

export default router;
