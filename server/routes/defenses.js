import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import Defense from '../models/Defense.js';

const router = express.Router();

// Get all defenses (role-based filtering)
router.get('/', authenticateToken, async (req, res) => {
  try {
    let query = {};

    if (req.user.role === 'evaluator') {
      query.$or = [
        { internalEvaluatorId: req.user._id },
        { externalEvaluatorId: req.user._id },
      ];
    }

    const defenses = await Defense.find(query)
      .populate('projectId', 'title projectCode')
      .populate('supervisorId', 'name')
      .populate('internalEvaluatorId', 'name')
      .populate('externalEvaluatorId', 'name')
      .sort({ scheduledDate: 1 });

    res.json({
      success: true,
      data: defenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch defenses',
    });
  }
});

// UC-22: Submit Evaluation
router.patch('/:defenseId/evaluate', authenticateToken, async (req, res) => {
  try {
    const { defenseId } = req.params;
    const { presentationScore, demoScore, qaScore, reportScore, remarks } = req.body;

    const defense = await Defense.findById(defenseId);
    if (!defense) {
      return res.status(404).json({ success: false, message: 'Defense not found' });
    }

    // Determine which evaluation to update
    let evaluationType;
    if (defense.supervisorId.toString() === req.user._id.toString()) {
      evaluationType = 'supervisorEvaluation';
    } else if (defense.internalEvaluatorId.toString() === req.user._id.toString()) {
      evaluationType = 'internalEvaluation';
    } else if (defense.externalEvaluatorId.toString() === req.user._id.toString()) {
      evaluationType = 'externalEvaluation';
    } else {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    // Calculate total (FR-4.2)
    const totalScore = presentationScore + demoScore + qaScore + reportScore;

    defense[evaluationType] = {
      presentationScore,
      demoScore,
      qaScore,
      reportScore,
      totalScore,
      remarks,
      submittedAt: new Date(),
    };

    // Calculate aggregated score if all evaluations submitted
    if (
      defense.supervisorEvaluation?.totalScore &&
      defense.internalEvaluation?.totalScore &&
      defense.externalEvaluation?.totalScore
    ) {
      defense.aggregatedScore =
        (defense.supervisorEvaluation.totalScore +
          defense.internalEvaluation.totalScore +
          defense.externalEvaluation.totalScore) / 3;
      defense.gradeStatus = 'submitted';
    }

    await defense.save();

    res.json({
      success: true,
      message: 'Evaluation submitted successfully',
      data: defense,
    });
  } catch (error) {
    console.error('Evaluation submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit evaluation',
    });
  }
});

export default router;
