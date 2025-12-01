import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import Notification from '../models/Notification.js';

const router = express.Router();

// Get user notifications (UC-27)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { isRead, type, limit = 50 } = req.query;

    const query = { userId: req.user._id };
    if (isRead !== undefined) {
      query.isRead = isRead === 'true';
    }
    if (type) {
      query.type = type;
    }

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    const unreadCount = await Notification.countDocuments({
      userId: req.user._id,
      isRead: false,
    });

    res.json({
      success: true,
      data: notifications,
      unreadCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications',
    });
  }
});

// Mark notification as read
router.patch('/:notificationId/read', authenticateToken, async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      {
        _id: req.params.notificationId,
        userId: req.user._id,
      },
      {
        isRead: true,
        readAt: new Date(),
      },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found',
      });
    }

    res.json({
      success: true,
      data: notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to mark notification as read',
    });
  }
});

// Mark all as read
router.post('/mark-all-read', authenticateToken, async (req, res) => {
  try {
    await Notification.updateMany(
      {
        userId: req.user._id,
        isRead: false,
      },
      {
        isRead: true,
        readAt: new Date(),
      }
    );

    res.json({
      success: true,
      message: 'All notifications marked as read',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to mark all as read',
    });
  }
});

export default router;
