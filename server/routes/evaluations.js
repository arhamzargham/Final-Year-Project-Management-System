import express from 'express';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import Defense from '../models/Defense.js';
import Project from '../models/Project.js';

const router = express.Router();

// Placeholder - to be implemented
router.get('/', (req, res) => {
  res.json({ success: true, data: [] });
});

export default router;
